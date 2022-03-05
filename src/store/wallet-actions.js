import { walletActions } from "./wallet-slice";
import { graphicActions } from "./graphic-slice";

const fetchTokensFromDB = async () => {
  const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json"
  const response = await fetch(URL);
  const tokenInfosFromDB = await response.json();
  return tokenInfosFromDB;
}

const constructAPITokensURL = (wallet) => {
  const URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="
  const queries = "&order=market_cap_desc&per_page=1&page=1&sparkline=false"
  const separator = "%2C%20";
  let listAttributs = "";
  
  for (const token in wallet) {
    listAttributs += wallet[token].id + separator
  }
  
  listAttributs = listAttributs.substring(0, listAttributs.length - separator.length);
  return (URL + listAttributs + queries);
};

const fetchTokensInfosFromAPI = async (wallet) => {
  const URL = constructAPITokensURL(wallet);
  const response = await fetch(URL);
  const tokensInfosFromAPI = await response.json();
  return tokensInfosFromAPI;
}


const constructDBPartOfWallet = (tempWallet, tokenInfosFromDB) => {
  for (const key in tokenInfosFromDB) {
    tempWallet.push(
      {
        key: key,
        id: tokenInfosFromDB[key].id,
        amount: Number(tokenInfosFromDB[key].amount),
        history: tokenInfosFromDB[key].history
      }
    )
  }
};

const constructAPIPartOfWallet = (tempWallet, tokensInfosFromAPI, dispatch) => {
  let totalWalletValue = 0;

  tempWallet.map((token) => {
    const index = tokensInfosFromAPI.findIndex((item) => item.id === token.id);
    token.name = tokensInfosFromAPI[index].name;
    token.symbol = tokensInfosFromAPI[index].symbol.toUpperCase();
    token.image = tokensInfosFromAPI[index].image;
    token.rank = tokensInfosFromAPI[index].market_cap_rank
    token.currentPrice = tokensInfosFromAPI[index].current_price;
    token.priceChangeDay = tokensInfosFromAPI[index].price_change_24h;
    token.totalValue = Number((token.amount * tokensInfosFromAPI[index].current_price).toFixed(2));
    totalWalletValue += parseFloat(token.totalValue);
    return true;
  });
  
  dispatch(walletActions.defineTotalValue(totalWalletValue));
  return totalWalletValue;
};

const constructTokensPercentages = (wallet, totalWalletValue) => {
  wallet.map((token) => token.percentage = ((token.totalValue / totalWalletValue) * 100).toFixed(1))
}

const createGraphData  = (listData, dispatch) => {
  const walletDataCpy = new Array(listData.length);
   for (const key in listData) 
    walletDataCpy[key] = {
      x: listData[key].symbol,
      y: Number(listData[key].percentage),
      image: listData[key].image
   }
  dispatch(graphicActions.fetchGraphDatas(walletDataCpy));
};

const constructWallet = (tokenInfosFromDB, tokensInfosFromAPI, dispatch) => {
  const tempWallet = [];
    //Build la partie Wallet de notre DB
    constructDBPartOfWallet(tempWallet, tokenInfosFromDB)
  
    //Build la partie Wallet de CoinGecko
    const totalWalletValue = constructAPIPartOfWallet(tempWallet, tokensInfosFromAPI, dispatch);
  
    //Build le pourcentage de chaque token
    constructTokensPercentages(tempWallet, totalWalletValue);
  
    tempWallet.sort((prevToken, token) => token.percentage - prevToken.percentage)
    createGraphData (tempWallet, dispatch);
    dispatch(walletActions.constructWallet(tempWallet));
  };

export const AddNewTokenToWallet  = (newToken) => {
  return async (dispatch) => {
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json";
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(newToken),
      headers: {
            'Content-Type': 'application/json'
          }
    });
    dispatch(fetchWallet());
  };
};

export const RemoveTokenFromWallet  = (tokenKey) => {
  return async (dispatch) => {
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + tokenKey + ".json";
    const response = await fetch(URL, {
      method: "DELETE",
      body: JSON.stringify(""), //remove body
      headers: {
            'Content-Type': 'application/json'
          }
    });
    dispatch(fetchWallet());
  };
};

export const ModifyTokenFromWallet  = (tokenKey, tokenInfos) => {
  return async (dispatch) => {
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet/" + tokenKey + ".json";
    const response = await fetch(URL, {
      method: "PUT",
      body: JSON.stringify(tokenInfos),
      headers: {
            'Content-Type': 'application/json'
          }
    });
    dispatch(fetchWallet());
  }
};

export const fetchWallet = () => {
  return async (dispatch) => {
  // Récupère donnés des deux DB (Notre et CoinGecko)
  const tokenInfosFromDB = await fetchTokensFromDB();
  const tokensInfosFromAPI = await fetchTokensInfosFromAPI(tokenInfosFromDB);
  //Construit le porte-feuille
  constructWallet(tokenInfosFromDB, tokensInfosFromAPI, dispatch);
  };
};

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