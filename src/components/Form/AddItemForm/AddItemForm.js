import NameInput from "../Inputs/NameInput";
import AmountInput from "../Inputs/AmountInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useDispatch } from "react-redux";
import classes from "./AddItemForm.module.css";
import { AddItemToWallet } from "../../../store/Wallet/wallet-actions";
import useInput from "../../../hooks/useInput";
import { Fragment, useContext } from "react";
import ThemeContext from "../../../store/Theme/theme-context";


const AddItemForm = (props) => {
  const {
    input: nameInput,
    inputValueHandler: nameInputValueHandler,
    nameInputValidityHandler,
    resetInputHandler: resetNameInputHandler,
    inputValueOverwrite: nameInputOverwrite,
    errorMessage,
  } = useInput("name");

  const {
    input: amountInput,
    inputValueHandler: amountInputValueHandler,
    amountInputValidityHandler,
    resetInputHandler: resetAmountInputHandler,
  } = useInput("amount");
  
  const dispatch = useDispatch();

  const themeCtx = useContext(ThemeContext);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const itemID = nameInputValidityHandler();
    if (!amountInputValidityHandler() || !itemID)
      return;

    dispatch(
      AddItemToWallet({
        id: itemID,
        amount: amountInput.value,
      })
    );
    resetNameInputHandler();
    resetAmountInputHandler();
  };

  return ( 
    <Fragment>
      <h1 className={classes.title} style={{color: !themeCtx.lightTheme? "white": "#524589"}}>Add Cryptocurrency to Wallet</h1>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
        autoComplete="off"
      >
        <div  className={classes["inputs-container"]}>
          <NameInput
            data={nameInput}
            onChange={nameInputValueHandler}
            errorMessage={errorMessage}
            nameInputOverwrite={nameInputOverwrite}
          />
          <AmountInput
            data={amountInput}
            onChange={amountInputValueHandler} />
        </div>
        <SubmitButton />
      </form>
    </Fragment>
  );
};

export default AddItemForm;
