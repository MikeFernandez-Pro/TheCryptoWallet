import { useContext, useState } from "react";
import ListTokens from "../ListTokens/ListTokens";
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./Inputs.module.css"

const NameInput = (props) => {

    const themeCtx = useContext(ThemeContext);
    const [nameInputFocus, setNameInputFocus] = useState(false);
  
    const inputClasses = `${classes["inputs-container"]} 
    ${!props.data.validity ? classes["invalid-inputs-container"] : ""}
    ${nameInputFocus && props.data.value ? classes.active : ""}
    ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`;

    const itemSelected = (newValue) => {
      props.nameInputOverwrite(newValue);
    }

    const nameFocusHandler = () => {
      if (!nameInputFocus)
      setNameInputFocus(true);
    };

    return (
        <div className={inputClasses}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              list="tokens"
              placeholder="Coin's Name"
              value={props.data.value}
              onChange={props.onChange}
              onFocus={nameFocusHandler}
            />
            {nameInputFocus && props.data.value && <ListTokens 
                inputValue={props.data.value}
                itemSelected={itemSelected}
                nameInputFocus={nameInputFocus}
                setNameInputFocus={setNameInputFocus}
            />}

            {!props.data.validity && (
              <p className={classes.invalid}>{props.errorMessage}</p>
            )}
          </div>
    );
};

export default NameInput;