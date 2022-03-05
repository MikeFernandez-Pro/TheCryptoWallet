import { useContext } from "react";
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./Card.module.css"

const Card = (props) => {
    
    const themeCtx = useContext(ThemeContext);

    return (
        <div className={`${classes.card} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}>
            {props.children}
        </div>
    );
}

export default Card;