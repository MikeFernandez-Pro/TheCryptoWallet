import { walletActions } from "./wallet-slice";

export const fetchTokensList = () => {
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
    dispatch(walletActions.constructTokenList(transformedList));
    dispatch(walletActions.datasLoaded());
  }; 
}