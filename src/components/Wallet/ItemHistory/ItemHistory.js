import {useContext} from "react"
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./ItemHistory.module.css"

const ItemHistory = (props) => {

    const themeCtx = useContext(ThemeContext);

    let index = -1;

    return ( 
                <ul className={`${classes["history-container"]} ${!themeCtx.lightTheme? classes["dark-theme"] : ""}`}>
                {props.history.map((item) => {
                    index = index + 1;
                    if (index === props.history.length - 1)
                        return (
                            <li key={index} className={classes["date-container"]}>
                                <div>{item.date}</div>
                                <div>-</div>
                                <div>{item.amount}</div>
                            </li>
                        )
                    const itemAmount = Number(item.amount)
                    const prevItemAmount = Number(props.history[index + 1].amount)
                    return <li key={index} className={classes["date-container"]}>
                        <div>{item.date}</div>
                        <div className={itemAmount - prevItemAmount >= 0 ? classes.positive : classes.negative}>                            
                            {itemAmount - prevItemAmount >= 0 ? "+" + (itemAmount - prevItemAmount).toString() : itemAmount - prevItemAmount}
                        </div>
                        <div>{item.amount}</div>
                        </li>
                })}
                </ul>
    );
};

export default ItemHistory;