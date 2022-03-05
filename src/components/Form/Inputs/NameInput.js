import { useContext } from "react";
import ListTokens from "../ListTokens/ListTokens";
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./Inputs.module.css"

const NameInput = (props) => {

    const themeCtx = useContext(ThemeContext);

    const inputClasses = `${classes["inputs-container"]}
    ${!props.data.validity ? classes["invalid-inputs-container"] : ""}
    ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`;

    return (
        <div className={inputClasses} >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              list="tokens"
              placeholder="Search a cryptocurrency"
              value={props.data.value}
              onChange={props.onChange}
              className={classes["background-icon"]}
            />
            <ListTokens inputValue={props.data.value} />
            {!props.data.validity && (
              <p className={classes.invalid}>{props.errorMessage}</p>
            )}
          </div>
    );
};

export default NameInput;