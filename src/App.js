import {useEffect, useState, useContext} from "react";
import NewItemForm  from "./components/Form/AddItemForm/AddItemForm";
import Graphic from "./components/Graphic/Graphic";
import WalletContainer from "./components/Wallet/WalletContainer/WalletContainer";
import useSendDataToWallet from "./hooks/useSendDataToWallet";
import ThemeContext from "./store/theme-context";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux"
import { walletActions } from "./store/wallet-slice";
import { fetchTokensList } from "./store/wallet-actions";

import classes from "./App.module.css";
import ItemsLegend from "./components/ItemsLegend";

function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.wallet.isLoading)
  const [graphData, setGraphData] = useState([]);

  const themeCtx = useContext(ThemeContext);

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

  const constructTokensPercentages = (wallet, totalWalletValue) => {
    wallet.map((token) => token.percentage = ((token.totalValue / totalWalletValue) * 100).toFixed(1))
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

  const constructAPIPartOfWallet = (tempWallet, tokensInfosFromAPI) => {
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

  const constructWallet = (tokenInfosFromDB, tokensInfosFromAPI) => {
    const tempWallet = [];

    //Build la partie Wallet de notre DB
    constructDBPartOfWallet(tempWallet, tokenInfosFromDB)

    //Build la partie Wallet de CoinGecko
    const totalWalletValue = constructAPIPartOfWallet(tempWallet, tokensInfosFromAPI);

    //Build le pourcentage de chaque token
    constructTokensPercentages(tempWallet, totalWalletValue);

    tempWallet.sort((prevToken, token) => token.percentage - prevToken.percentage)
    createGraphData (tempWallet);
    dispatch(walletActions.constructWallet(tempWallet));
  };

  const fetchTokensFromDB = async () => {
    const URL = "https://thewallet-77fd4-default-rtdb.europe-west1.firebasedatabase.app/wallet.json"
    const response = await fetch(URL);
    const tokenInfosFromDB = await response.json();
    return tokenInfosFromDB;
  }

  const fetchTokensInfosFromAPI = async (wallet) => {
    const URL = constructAPITokensURL(wallet);
    const response = await fetch(URL);
    const tokensInfosFromAPI = await response.json();
    return tokensInfosFromAPI;
  }

  const fetchWallet = async () => {

    // Récupère donnés des deux DB (Notre et CoinGecko)
    const tokenInfosFromDB = await fetchTokensFromDB();
    const tokensInfosFromAPI = await fetchTokensInfosFromAPI(tokenInfosFromDB);

    //Construit le porte-feuille
    constructWallet(tokenInfosFromDB, tokensInfosFromAPI);
  };



  const AddNewTokenToWallet  = async (newToken) => {
    // Création nouveau token
    useSendDataToWallet("", "", "POST", newToken, fetchWallet);
  }

  const RemoveTokenFromWallet = async (tokenKey, tokenID) => {
    useSendDataToWallet(tokenKey, "", "DELETE", "", fetchWallet);
  }

  const ModifyTokenFromWallet = async (tokenKey, tokenInfos) => {
    useSendDataToWallet(tokenKey, "", "PUT", tokenInfos, fetchWallet);
    //ici ajouter logique
  };

    const createGraphData  = (listData) => {
        const walletDataCpy = new Array(listData.length);
         for (const key in listData) 
          walletDataCpy[key] = {
            x: listData[key].symbol,
            y: Number(listData[key].percentage),
            image: listData[key].image
         }
          setGraphData(walletDataCpy)
    };

  useEffect(() => { 
    const constructApp = async () => {
      await fetchWallet();
      dispatch(fetchTokensList());
    }

    constructApp();
  }, [fetchWallet, dispatch])

  return (
    isLoading ?
    <p>Loading...</p> :
      <div className={`${classes.app} ${!themeCtx.lightTheme? classes["dark-mode"] : ""}`} >
        <Header />
        <Graphic dataGraph={graphData}/>
        <div className={`${classes.container} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}>
          <ItemsLegend />
          <WalletContainer
            removeToken={RemoveTokenFromWallet}
            modifyToken={ModifyTokenFromWallet }
          />
          <NewItemForm
            addNewTokenToWallet={AddNewTokenToWallet}
          />
        </div>
      </div>
  );
}

export default App;
