import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"
import Header from "./components/Header/Header";
import Loader from "./components/UI/Loader/Loader";
import Body from "./components/Body/Body";
import ThemeContext from "./store/Theme/theme-context";
import { fetchAllowedItemsList, fetchWallet } from "./store/Wallet/wallet-actions";

import classes from "./App.module.css";
import { Fragment } from "react/cjs/react.production.min";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import CryptosList from "./pages/CryptosList";


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
  
  window.document.body.style.backgroundColor = !themeCtx.lightTheme? "black" : "white";
  
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path="/" exact>
            <Redirect to='/wallet' />
          </Route>
          <Route path="/wallet" exact >
          {isLoading && <Loader />}
          {!isLoading &&
            <div className={`${classes.app} ${themeClass}`} >
              <Body />
            </div>
          }
          </Route>
          <Route path="/assets-list" exact>
            <CryptosList />
          </Route>
          <Route path="*">
            <Redirect to='/wallet' />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
