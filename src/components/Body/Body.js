import { useContext } from "react";
import WalletContainer from "../Wallet/WalletContainer/WalletContainer";
import AdddItemForm  from "../Form/AddItemForm/AddItemForm";
import ThemeContext from "../../store/Theme/theme-context";
import classes from "./Body.module.css";

const Body = (props) => {
    const themeCtx = useContext(ThemeContext);
    const themeClass = !themeCtx.lightTheme? classes["dark-mode"] : "";

    return (
        <div className={`${classes.container} ${themeClass}`}>
          <WalletContainer />
          <AdddItemForm />
        </div>
    );
};

export default Body;