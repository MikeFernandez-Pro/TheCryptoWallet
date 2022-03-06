import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import Graphic from "./components/Graphic/Graphic";
import Header from "./components/Header/Header";
import Loader from "./components/UI/Loader/Loader";
import Body from "./components/Body/Body";
import ThemeContext from "./store/Theme/theme-context";
import { fetchAllowedItemsList, fetchWallet } from "./store/Wallet/wallet-actions";

import classes from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const themeCtx = useContext(ThemeContext);
  const isLoading = useSelector((state) => state.wallet.isLoading)

  useEffect(() => {
    (async function () {
      await dispatch(fetchWallet());
      await dispatch(fetchAllowedItemsList());
    })()
  }, [dispatch])

  const themeClass = !themeCtx.lightTheme? classes["dark-mode"] : "";
  
  return (
    isLoading ?
      <Loader /> :
      <div className={`${classes.app} ${themeClass}`} >
        <Header />
        <Graphic />
        <Body />
      </div>
  );
}

export default App;
