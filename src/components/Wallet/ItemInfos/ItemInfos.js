import { Fragment, useContext } from "react";
import {useSelector } from "react-redux"
import ThemeContext from "../../../store/Theme/theme-context";

import classes from "./ItemInfos.module.css"

const ItemInfos = (props) => {

    const showValue = useSelector((state) => state.wallet.showValue);
    const hided = "*******";

    const themeCtx = useContext(ThemeContext);
    const symbolClass = !themeCtx.lightTheme ? classes.symbol : classes["light-symbol"];
    
    return (
        <Fragment>
            <div className={classes["token-presentation"]}>
                <img src={props.item.image} alt={props.item.symbol} />
                <div className={classes["token-name"]}>
                    <label className={symbolClass}>{props.item.symbol}</label>
                    <label>{props.item.name}</label>
                </div>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Current Price (USD)</label>
                <label>{props.item.currentPrice.toString()}<span style={{"fontSize": "0.8rem"}}> USD</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Amount</label>
                <label>{!showValue ? hided : props.item.amount}<span style={{"fontSize": "0.8rem"}}> {props.item.symbol}</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Total Value (USD)</label>
                <label>{!showValue ? hided : props.item.totalValue.toString()}<span style={{"fontSize": "0.8rem"}}> USD</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Percentage</label>
                <label>{props.item.percentage}%</label>
            </div>
        </Fragment>
    );
};

export default ItemInfos;