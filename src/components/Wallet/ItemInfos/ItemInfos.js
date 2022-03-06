import { Fragment } from "react/cjs/react.production.min";
import {useSelector } from "react-redux"
import classes from "./ItemInfos.module.css"

const ItemInfos = (props) => {

    const showValue = useSelector((state) => state.wallet.showValue);
    const hided = "*******";
    
    return (
        <Fragment>
            <div className={classes["name-container"]}>
                <li>{props.item.name}</li>
                <li className={classes.symbol}>({props.item.symbol})</li>
            </div>
            <li>{!showValue ? hided : props.item.amount}</li>
            <li>{!showValue ? hided : props.item.totalValue.toString() + "$"}</li>
            <li>{!showValue ? hided : props.item.currentPrice.toString() + "$"}</li>
            <li>{props.item.percentage}%</li>
        </Fragment>
    );
};

export default ItemInfos;