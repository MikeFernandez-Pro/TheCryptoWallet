import { useContext } from "react";
import {useSelector} from "react-redux"
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./ListTokens.module.css";

const List = (props) => {

    const tokensList = useSelector( (state) => state.wallet.tokensList);
    const themeCtx = useContext(ThemeContext);

    const themeClass = !themeCtx.lightTheme ? classes["dark-mode"] : "";

    const tokensFinded = tokensList.filter(item => {
        const name = item.name.toLowerCase();
        const symbol = item.symbol.toLowerCase();
        const inputValue = props.inputValue.toLowerCase();
        return inputValue && (name.includes(inputValue) || symbol.includes(inputValue))
    });
    

    return (

        <ul className={` ${classes.container} ${themeClass} `}>
        {
            tokensFinded.length === 0 ?
            <li
                key={"unfinded"}
                style={{cursor: "default", textAlign: "center"}}
            >
                    Nothing Found
            </li>
            : tokensFinded.map(item => 
                <li

                    key={item.symbol}
                    onClick={() => {
                        props.itemSelected(item.name)
                        props.setNameInputFocus(false)
                    }}
                >
                    {item.name} <span className={classes.legend}>({item.symbol})</span>
                </li>
            )
        }
        </ul>
    );
};

export default List;