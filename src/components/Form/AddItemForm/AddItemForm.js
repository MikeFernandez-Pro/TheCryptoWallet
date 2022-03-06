import Card from "../../UI/Card/Card";
import NameInput from "../Inputs/NameInput";
import AmountInput from "../Inputs/AmountInput";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useDispatch } from "react-redux";
import classes from "./AddItemForm.module.css";
import { AddItemToWallet } from "../../../store/Wallet/wallet-actions";
import useInput from "../../../hooks/useInput";

const AddItemForm = (props) => {
  const {
    input: nameInput,
    inputValueHandler: nameInputValueHandler,
    nameInputValidityHandler,
    resetInputHandler: resetNameInputHandler,
    errorMessage,
  } = useInput("name");

  const {
    input: amountInput,
    inputValueHandler: amountInputValueHandler,
    amountInputValidityHandler,
    resetInputHandler: resetAmountInputHandler,
  } = useInput("amount");
  
  const dispatch = useDispatch();

  const itemHistoryCreation = () => {
    const date = new Date().toDateString();
    return [{
      date: date.substring(date.search(" ")),
      amount: amountInput.value,
    }];
};

  const submitFormHandler = (event) => {
    event.preventDefault();

    const itemID = nameInputValidityHandler();
    if (!amountInputValidityHandler() || !itemID)
      return;

    dispatch(
      AddItemToWallet({
        id: itemID,
        amount: amountInput.value,
        history: itemHistoryCreation(),
      })
    );
    resetNameInputHandler();
    resetAmountInputHandler();
  };

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}>
        <div className={classes["inputs-container"]}>
          <NameInput
            data={nameInput}
            onChange={nameInputValueHandler}
            errorMessage={errorMessage}
          />
          <AmountInput
            data={amountInput}
            onChange={amountInputValueHandler} />
        </div>
        <SubmitButton />
      </form>
    </Card>
  );
};

export default AddItemForm;
