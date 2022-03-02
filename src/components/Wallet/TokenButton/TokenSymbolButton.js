import { useContext } from "react";
import ThemeContext from "../../../store/theme-context";
import classes from "./TokenSymbolButton.module.css"

const TokenSymbolButton = (props) => {

    const themeCtx = useContext(ThemeContext);
    
    const symbolButtonClasses = `${classes["token-symbol-button"]} ${!themeCtx.lightTheme? classes["dark-mode"] : ""}`
    
    return (
        <button className={symbolButtonClasses} onClick={props.showHistoryHandler}>
            <img 
                className={classes["token-symbol-img"]}
                src={props.image}
                alt={props.alt}
            />
        </button>
    );
}

export default TokenSymbolButton;