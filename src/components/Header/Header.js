import { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";
import { useHistory } from "react-router-dom";
import ShowHideValueButton from "../UI/ShowHideValueButton/ShowHideValueButton";
import ThemeButton from "../UI/ThemButton/ThemeButton";
import TheWalletLogo from "../../images/TheWalletLogo.png"
import ThemeContext from "../../store/Theme/theme-context";

const Header = (props) => {
 
  const history = useHistory();
  const themeCtx = useContext(ThemeContext);

  const homepageHandler = () => {
    history.push("/")
  };

  const activeLink = !themeCtx.lightTheme ?
    {"fontWeight": "bold",  "color": "rgb(154, 106, 255)"} :
    {"fontWeight": "bold",  "color": "#7645D9"};

  return (
    <header className={`${classes.header} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}>
      <div className={`${classes.title} ${!themeCtx.lightTheme ? classes["dark-title"] : ""}`} onClick={homepageHandler}>
        <img src={TheWalletLogo} alt="TheWalletLogo" className={classes.logo}/>
        <h1>The Wallet</h1>
      </div>
      {window.innerWidth < 500 &&
      <div className={classes.mobile}>
        <nav> 
          <ul>
            <li>
              <NavLink activeStyle={activeLink} to="/wallet"> 
                Wallet Overview
              </NavLink>
            </li>
            <li>
              <NavLink activeStyle={activeLink} to="/assets-list"> 
                Available Coins
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={classes["display-options"]}>
            <ShowHideValueButton/>
            <ThemeButton />
        </div>
      </div> }
      {window.innerWidth >= 500 &&
        <Fragment>
          <nav> 
            <ul>
              <li>
                <NavLink activeStyle={activeLink} to="/wallet"> 
                  Wallet Overview
                </NavLink>
              </li>
              <li>
                <NavLink activeStyle={activeLink} to="/assets-list"> 
                  Available Coins
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={classes["display-options"]}>
              <ShowHideValueButton/>
              <ThemeButton />
          </div>
        </Fragment>
      }


    </header>
  );
};

export default Header;
