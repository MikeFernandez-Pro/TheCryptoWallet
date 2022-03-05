import {useEffect, useContext} from "react";
import AdddItemForm  from "./components/Form/AddItemForm/AddItemForm";
import Graphic from "./components/Graphic/Graphic";
import WalletContainer from "./components/Wallet/WalletContainer/WalletContainer";
import useSendDataToWallet from "./hooks/useSendDataToWallet";
import ThemeContext from "./store/theme-context";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux"
import { fetchTokensList, fetchWallet } from "./store/wallet-actions";

import classes from "./App.module.css";
import ItemsLegend from "./components/ItemsLegend";
import Loader from "./components/UI/Loader/Loader";

function App() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.wallet.isLoading)
  const graphData = useSelector((state) => state.graphic.datas);

  const themeCtx = useContext(ThemeContext);

  useEffect(() => {
    (async function () {
      await dispatch(fetchWallet());
      await dispatch(fetchTokensList());
    })()
  }, [dispatch])

  return (
    isLoading ?
      <Loader /> :
      <div className={`${classes.app} ${!themeCtx.lightTheme? classes["dark-mode"] : ""}`} >
        <Header />
        <Graphic dataGraph={graphData}/>
        <div className={`${classes.container} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}>
          <ItemsLegend />
          <WalletContainer />
          <AdddItemForm />
        </div>
      </div>
  );
}

export default App;
