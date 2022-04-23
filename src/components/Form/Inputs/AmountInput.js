import {useContext} from "react"
import classes from "./Inputs.module.css"
import ThemeContext from "../../../store/Theme/theme-context";

const AmountInput = (props) => {

    const themeCtx = useContext(ThemeContext)
  
    const inputClasses = `${classes["inputs-container"]}
    ${!props.data.validity ? classes["invalid-inputs-container"] : ""}
    ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`;

    return (
        <div className={inputClasses} >
            <label htmlFor="amount">Coin's Amount</label>
            <input
              type="number"
              name="amount"
              value={props.data.value === 0 ? "" : props.data.value}
              onChange={props.onChange}
              placeholder="Enter an Amount"
            />
            {!props.data.validity && (
              <p className={classes.invalid}>Invalid Amount</p>
            )}
          </div>
    );
};

export default AmountInput;
