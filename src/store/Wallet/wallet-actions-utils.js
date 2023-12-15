import { walletActions } from "./wallet-slice";
import { graphicActions } from "../Graphic/graphic-slice";
import { fetchWallet } from "./wallet-actions";
import { Component } from "react";

export const sendHTTPRequestToDB = async (itemKey, requestMethod, bodyContent, dispatch) => {
    const URL = itemKey ?
      "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + itemKey + ".json":
      "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json"
      
    try {
      const response = await fetch(URL, {
        method: requestMethod,
        body: JSON.stringify(bodyContent),
        headers: {
              'Content-Type': 'application/json'
            }
      });

      if (!response.ok) {
        throw new Error('An error occurred : Failed to communicate with database')
      }

      dispatch(fetchWallet());
      
    }  catch (error) {
      window.alert('An error occurred : Failed to communicate with database');
    }
};
  
export const fetchItemsFromDB = async () => {
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json"
    
    try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("An error occurred : Failed to retrieve Wallet's data from the database")
    }

    const itemsInfosFromDB = await response.json();
    return itemsInfosFromDB;

  }  catch (error) {
    window.alert("An error occurred : Failed to retrieve Wallet's data from the database");
  }
};
  
export const constructAPIRequestURL = (wallet) => {
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
    const queries = "&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
    const separator = "%2C";
    const api_key = "CG-UvgmjN8WCoQiDbgPEi39HZi4";
    let listAttributs = "";
    
    for (const item in wallet) {
      listAttributs += wallet[item].id + separator
    }

    listAttributs = listAttributs.substring(0, listAttributs.length - separator.length);
  
    return (URL + listAttributs + queries + "&x_cg_demo_api_key=" + api_key);
};
  
export const fetchItemsInfosFromAPI = async (wallet) => {
    const URL = constructAPIRequestURL(wallet);
    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error('An error occurred : Failed to retrieve data from API')
      }

      const itemsInfosFromAPI = await response.json();
      console.log("itemsInfosFromAPI")
      console.log(itemsInfosFromAPI)
      return itemsInfosFromAPI;

    }  catch (error) {
      window.alert('An error occurred : Failed to retrieve data from API');
    }
};
  
export const constructDBPartOfWallet = (tempWallet, itemsInfosFromDB) => {
    for (const key in itemsInfosFromDB) {
      tempWallet.push({...itemsInfosFromDB[key], key: key})
    }
};
  
export const constructAPIPartOfWallet = (tempWallet, itemsInfosFromAPI, dispatch) => {
    let totalWalletValue = 0;
  
    tempWallet.map((item) => {
      const index = itemsInfosFromAPI.findIndex((itemFromAPI) => itemFromAPI.id === item.id);
      item.name = itemsInfosFromAPI[index].name;
      item.symbol = itemsInfosFromAPI[index].symbol.toUpperCase();
      item.image = itemsInfosFromAPI[index].image;
      item.rank = itemsInfosFromAPI[index].market_cap_rank
      item.currentPrice = itemsInfosFromAPI[index].current_price;
      item.priceChangeDay = itemsInfosFromAPI[index].price_change_24h;
      item.totalValue = Number((item.amount * itemsInfosFromAPI[index].current_price).toFixed(2));
      totalWalletValue += parseFloat(item.totalValue);
      return true;
    });
    
    tempWallet.map((item) => item.percentage = ((item.totalValue / totalWalletValue) * 100).toFixed(1));
    tempWallet.sort((prevItem, item) => item.percentage - prevItem.percentage);
    dispatch(walletActions.defineTotalValue(totalWalletValue));
};
  
export const constructItemsPercentages = (wallet, totalWalletValue) => {  
};
  
export const createGraphData  = (listData, dispatch) => {
    const walletDataCpy = new Array(listData.length);
     for (const key in listData) 
      walletDataCpy[key] = {
        x: listData[key].symbol,
        y: Number(listData[key].percentage),
        image: listData[key].image
     }
    dispatch(graphicActions.fetchGraphDatas(walletDataCpy));
};

export const constructWallet = (itemsInfosFromDB, itemsInfosFromAPI, dispatch) => {
      const tempWallet = [];
      
      // Build la partie Wallet de notre DB
      constructDBPartOfWallet(tempWallet, itemsInfosFromDB);
      
      // Build la partie Wallet de CoinGecko
      constructAPIPartOfWallet(tempWallet, itemsInfosFromAPI, dispatch);
      
      // Create Graphic datas
      createGraphData (tempWallet, dispatch);
  
      dispatch(walletActions.constructWallet(tempWallet));
};
