import { walletActions } from "./wallet-slice";
import { graphicActions } from "../Graphic/graphic-slice";
import * as utils from "./wallet-actions-utils";

export const AddItemToWallet  = (newItem) => {
  return async (dispatch) => {
    utils.sendHTTPRequestToDB(null, "POST", newItem, dispatch);
  };
};

export const RemoveItemFromWallet  = (itemKey) => {
  return async (dispatch) => {
    utils.sendHTTPRequestToDB(itemKey, "DELETE", null, dispatch);
  };
};

export const ModifyItemIntoWallet  = (itemKey, itemInfos) => {
  return async (dispatch) => {
    utils.sendHTTPRequestToDB(itemKey, "PUT", itemInfos, dispatch);
  }
};

export const fetchWallet = () => {
  return async (dispatch) => {
    
    // Retrieve datas from DB
    const itemsInfosFromDB = await utils.fetchItemsFromDB();
    // Retrieve datas from API (CoinGecko)
    const itemsInfosFromAPI = await utils.fetchItemsInfosFromAPI(itemsInfosFromDB);
    // Build wallet object
    utils.constructWallet(itemsInfosFromDB, itemsInfosFromAPI, dispatch);
  };
};

export const fetchAllowedItemsList = () => {
  return async (dispatch) => {
    let transformedList = []
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/coinsList.json"
    
    const response = await fetch(URL)
    const data = await response.json();
    
    for (const key in data) {
      transformedList.push({
        id: data[key].id,
        name: data[key].name,
        symbol: data[key].symbol.toUpperCase(),
        image: data[key].image
      })
    }
    dispatch(walletActions.constructAllowedItemsList(transformedList));
    dispatch(walletActions.datasLoaded());
  }; 
}