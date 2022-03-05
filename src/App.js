import {useEffect, useContext} from "react";
import AdddItemForm  from "./components/Form/AddItemForm/AddItemForm";
import Graphic from "./components/Graphic/Graphic";
import WalletContainer from "./components/Wallet/WalletContainer/WalletContainer";
import ThemeContext from "./store/Theme/theme-context";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllowedItemsList, fetchWallet } from "./store/Wallet/wallet-actions";

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
      await dispatch(fetchAllowedItemsList());
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
