import { useDispatch, useSelector } from "react-redux";
import { walletActions } from "../store/Wallet/wallet-slice";
import { useCallback, useEffect, useState, useContext} from "react";
import Ascending from "../images/Ascending.png";
import Descending from "../images/Descending.png";
import AscendingLight from "../images/AscendingLight.png";
import DescendingLight from "../images/DescendingLight.png";
import ThemeContext from "../store/Theme/theme-context";

import classes from "./CryptosList.module.css";

const CryptosList = (props) => {
  const tokensList = useSelector((state) => state.wallet.tokensList);
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState(false);
  const [sortingType, setSortingType] = useState("Rank");
  const [sortAscending, setSortAscending] = useState(true);

  const themeCtx = useContext(ThemeContext);

  const listSortingHandler = useCallback(
    (selection) => {
      const types = ["Rank", "Name", "Current Price", "Price Variation"];
      const values = [
        "rank",
        "name",
        "currentPrice",
        "priceChangePercentagePerDay",
      ];

      for (const i in types) {
        if (types[i] === selection) {
          const listSortingType = [...tokensList];
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
          dispatch(walletActions.constructAllowedItemsList(listSortingType));
        }
      }
    },
    [sortAscending, dispatch, tokensList]
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
    <div className={classes["tokens-list"]}>
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
                {sortingType !== "Rank" && (
                  <li onClick={() => sortingTypeHandler("Rank")}>Rank</li>
                )}
                {sortingType !== "Name" && (
                  <li onClick={() => sortingTypeHandler("Name")}>Name</li>
                )}
                {sortingType !== "Current Price" && (
                  <li onClick={() => sortingTypeHandler("Current Price")}>
                    Current Price
                  </li>
                )}
                {sortingType !== "Price Variation" && (
                  <li onClick={() => sortingTypeHandler("Price Variation")}>
                    Price Variation
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
          ></img>
        </div>
      </div>
      <ul className={`${classes["list-container"]} ${!themeCtx.lightTheme? classes["dark-theme"] : ""}`}>
        {tokensList.map((item, index) => (
          <li
            className={`${classes["item-container"]} ${
              index === tokensList.length - 1 ? classes.last : ""
            } ${!themeCtx.lightTheme? classes["dark-theme-item"] : ""}`}
            key={item.symbol}
          >
            <div className={`${classes["attribut-container"]} ${!themeCtx.lightTheme? classes["dark-theme-attribut"] : ""}`}>
              <label className={classes.legend}>Rank</label>
              <label>{item.rank}</label>
            </div>
            <div className={classes["token-container"]}>
              <img src={item.image} alt={item.symbol} />
              <label>{item.name}</label>
            </div>
            <div className={`${classes["attribut-container"]} ${!themeCtx.lightTheme? classes["dark-theme-attribut"] : ""}`}>
              <label className={classes.legend}>Current Price</label>
              <label>
                {item.currentPrice}{" "}
                <span style={{ fontSize: "0.8rem" }}>USD</span>
              </label>
            </div>
            <div className={`${classes["attribut-container"]} ${!themeCtx.lightTheme? classes["dark-theme-attribut"] : ""}`}>
              <label className={classes.legend}>Price Variation / 24h</label>
              <label
                style={{
                  color: !themeCtx.lightTheme
                    ?(item.priceChangePercentagePerDay > 0
                      ? "#91E780"
                      : "#F8595B")
                    : (item.priceChangePercentagePerDay > 0
                      ? "#43B141"
                      : "#DB0908")
                }}
              >
                {item.priceChangePercentagePerDay > 0 ? "+" : ""}
                {item.priceChangePercentagePerDay.toFixed(2)}%
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div className={classes["scroll-top-container"]}>
          <label onClick={() => window.scrollTo(0, 0)}>Back to Top</label>
          <div className={classes["scroll-top-arrow"]} />
      </div>
    </div>
  );
};

export default CryptosList;
