import { useContext, useState, useCallback, useEffect } from "react";
import WalletContainer from "../Wallet/WalletContainer/WalletContainer";
import AdddItemForm  from "../Form/AddItemForm/AddItemForm";
import ThemeContext from "../../store/Theme/theme-context";
import Graphic from "../Graphic/Graphic";
import {useDispatch, useSelector} from "react-redux"
import { walletActions } from "../../store/Wallet/wallet-slice";
import Ascending from "../../images/Ascending.png";
import Descending from "../../images/Descending.png";
import AscendingLight from "../../images/AscendingLight.png";
import DescendingLight from "../../images/DescendingLight.png";

import classes from "./Body.module.css";
import { Fragment } from "react";

const Body = (props) => {
  const themeCtx = useContext(ThemeContext);
  const themeClass = !themeCtx.lightTheme? classes["dark-mode"] : "";

  const walletTokens = useSelector( (state) => state.wallet.value);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState(false);
  const [sortingType, setSortingType] = useState("Percentage");
  const [sortAscending, setSortAscending] = useState(false);

  const listSortingHandler = useCallback(
    (selection) => {
      const types = ["Name", "Current Price", "Percentage"];
      const values = ["name","currentPrice","percentage"];

      for (const i in types) {
        if (types[i] === selection) {
          const listSortingType = [...walletTokens];
          if (selection === "Name") {
            listSortingType.sort((a, b) => {
              if (sortAscending) {
                return a[values[i]].toLowerCase() > b[values[i]].toLowerCase() ? 1 : -1;
              }
              return a[values[i]].toLowerCase() > b[values[i]].toLowerCase() ? -1 : 1;
            });
          }
          else {
            listSortingType.sort((a, b) => {
              if (sortAscending) {
                return Number(a[values[i]]) > Number(b[values[i]]) ? 1 : -1;
              }
              return Number(a[values[i]]) > Number(b[values[i]]) ? -1 : 1;
            });
          }
          dispatch(walletActions.constructWallet(listSortingType));
        }
      }
    },
    [sortAscending, dispatch, walletTokens]
  );

  const sortingTypeHandler = useCallback(
    (type) => {
      listSortingHandler(type);
      setSortingType(type);
      setSorting(false);
    },
    [listSortingHandler]
  );

  useEffect(() => {
    sortingTypeHandler(sortingType);
  }, [sortAscending]);

    return (
      <Fragment>
        <div className={`${classes["sorting-container"]} ${themeCtx.lightTheme? classes["light-theme"] : ""}`}>
          <label htmlFor="token-select" style={{color: !themeCtx.lightTheme? "": "#524589"}}>Sorted by</label>
          <div className={classes["sorting-direction-container"]}>
            <ul id="token-select">
              <div
                className={`${classes.select} ${sorting ? classes["active-sort"] : ""}`}
                onClick={() => setSorting(!sorting)}
              >
                <li className={classes["selected-sort"]}>{sortingType}</li>
                <div className={`${classes.arrow} ${themeCtx.lightTheme ? classes["light-arrow"] : ""}`} />
              </div>
              {sorting && (
                <div className={classes["sort-choices"]}>
                  {sortingType !== "Name" && (
                    <li onClick={() => sortingTypeHandler("Name")}>Name</li>
                  )}
                  {sortingType !== "Current Price" && (
                    <li onClick={() => sortingTypeHandler("Current Price")}>
                      Current Price
                    </li>
                  )}
                  {sortingType !== "Percentage" && (
                    <li onClick={() => sortingTypeHandler("Percentage")}>
                      Percentage
                    </li>
                  )}
                </div>
              )}
            </ul>
            <img
              className={classes["sorting-direction"]}
              src={sortAscending ? (themeCtx.lightTheme ? AscendingLight : Ascending) : (themeCtx.lightTheme ? DescendingLight : Descending)}
              alt="Sort Direction"
              onClick={() => {
                setSortAscending(!sortAscending);
              }}
             />
          </div>
        </div>
        <div className={`${classes.container} ${themeClass}`}>
          <Graphic />
          <WalletContainer />
          <AdddItemForm />
        </div>
        <div className={classes["scroll-top-container"]}>
          <label onClick={() => window.scrollTo(0, 0)}>Back to Top</label>
          <div className={classes["scroll-top-arrow"]} />
        </div>
      </Fragment>
    );
};

export default Body;