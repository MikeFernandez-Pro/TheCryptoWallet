import { Fragment, useContext } from "react";
import {useSelector } from "react-redux"
import ThemeContext from "../../../store/Theme/theme-context";

import classes from "./ItemInfos.module.css"

const ItemInfos = (props) => {

    const showValue = useSelector((state) => state.wallet.showValue);
    const hided = window.innerWidth > 500 ? "*******" : "*****";

    const themeCtx = useContext(ThemeContext);
    const symbolClass = !themeCtx.lightTheme ? classes.symbol : classes["light-symbol"];
    
    return (
        <Fragment>
            <div className={classes["token-presentation"]}>
                <img src={props.item.image} alt={props.item.symbol} />
                <div className={classes["token-name"]}>
                    <label className={window.innerWidth > 500 && symbolClass}>{props.item.symbol}</label>
                    {window.innerWidth > 500 && <label>{props.item.name}</label>}
                </div>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Current Price{window.innerWidth > 500 && " (USD)"}</label>
                <label>{props.item.currentPrice.toString()}<span className={classes.type}> USD</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Amount</label>
                <label>{!showValue ? hided : props.item.amount}<span className={classes.type}> {props.item.symbol}</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Total Value{window.innerWidth > 500 && " (USD)"}</label>
                <label>{!showValue ? hided : props.item.totalValue.toString()}<span className={classes.type}> USD</span></label>
            </div>
            <div className={classes.item}>
                <label className={symbolClass}>Percentage</label>
                <label>{props.item.percentage}%</label>
            </div>
        </Fragment>
    );
};

export default ItemInfos;