import { walletActions } from "./wallet-slice";
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
    const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=CG-UvgmjN8WCoQiDbgPEi39HZi4"
    
    try {
      const response = await fetch(URL)

      if (!response.ok) {
        throw new Error('An error occurred : Failed to communicate with API')
      }

      const data = await response.json();
      data.sort((a, b) => a.rank < b.rank);

      data.forEach((item) => {
        transformedList.push({
          id: item.id,
          name: item.name,
          symbol: item.symbol.toUpperCase(),
          image: item.image,
          currentPrice: item.current_price,
          rank: item.market_cap_rank,
          priceChangePercentagePerDay: item.price_change_percentage_24h
        })
      });
      dispatch(walletActions.constructAllowedItemsList(transformedList));
      dispatch(walletActions.datasLoaded());

    } catch (error) {
        window.alert("An error occurred : Failed to communicate with API");
    }
  }; 
}