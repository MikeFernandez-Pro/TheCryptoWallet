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
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              value={props.data.value}
              onChange={props.onChange}
            />
            {!props.data.validity && (
              <p className={classes.invalid}>Please enter a valid amount.</p>
            )}
          </div>
    );
};

export default AmountInput;
