import { useContext } from "react";
import ThemeContext from "../../../store/Theme/theme-context";
import themeIcon from "../../../images/themeIcon.png"
import themeLightIcon from "../../../images/themeLightIcon.png"
import { Fragment } from "react/cjs/react.production.min";

import classes from "./ThemeButton.module.css"

const ThemeButton = (props) => {

    const themeCtx = useContext(ThemeContext)
    const themeClass = themeCtx.lightTheme ? classes["sun-img"] : classes["moon-img"]
    const iconColor = themeCtx.lightTheme ? themeIcon : themeLightIcon
    
    const themeHandler = () => {
        themeCtx.changeTheme(false);
    }
    
    return (
        <Fragment>
            <img className={themeClass} src={iconColor} alt="theme icon" onClick={themeHandler} />
        </Fragment>
    );
};

export default ThemeButton;