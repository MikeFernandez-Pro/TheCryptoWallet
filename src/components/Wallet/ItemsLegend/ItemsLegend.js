import classes from "./ItemsLegend.module.css"

const ItemsLegend = () => {

    return (
        <ul className={classes["legend-container"]}>
          <li>Name</li>
          <li>Amount</li>
          <li>Total Value</li>
          <li>Price</li>
          <li>Percentage</li>
        </ul>
    );
};

export default ItemsLegend;