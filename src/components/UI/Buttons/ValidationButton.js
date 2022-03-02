import { useContext } from "react";
import ThemeContext from "../../../store/theme-context";
import classes from "./ValidationButton.module.css"

const ValidationButton = (props) => {

    const themeCtx = useContext(ThemeContext);
    
    return (
        <button
            className={`${classes["validation-button"]} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default ValidationButton;