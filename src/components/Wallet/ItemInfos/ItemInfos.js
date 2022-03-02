import { Fragment } from "react/cjs/react.production.min";
import {useSelector } from "react-redux"
import classes from "./ItemInfos.module.css"

const ItemInfos = (props) => {

    const showValue = useSelector((state) => state.wallet.showValue);
    const hided = "*******";
    
    return (
        <Fragment>
            <div className={classes["name-container"]}>
                <li>{props.name}</li>
                <li className={classes.symbol}>({props.symbol})</li>
            </div>
            <li>{!showValue ? hided : props.amount}</li>
            <li>{!showValue ? hided : props.totalValue.toString() + "$"}</li>
            <li>{!showValue ? hided : props.currentPrice.toString() + "$"}</li>
            <li>{props.percentage}%</li>
        </Fragment>
    );
};

export default ItemInfos;