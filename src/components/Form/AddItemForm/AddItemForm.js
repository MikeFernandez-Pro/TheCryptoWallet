import { useState } from "react";
import Card from "../../UI/Card/Card"
import NameInput from "../Inputs/NameInput"
import AmountInput from "../Inputs/AmountInput"
import SubmitButton from "../SubmitButton/SubmitButton"
import {useDispatch, useSelector} from "react-redux"
import classes from "./AddItemForm.module.css";
import { AddNewTokenToWallet } from "../../../store/wallet-actions";

const AddItemForm = (props) => {

    const [nameInput, setNameInput] = useState({value: "", validity: true});
    const [amountInput, setAmountInput] = useState({value: 0, validity: true});
    const [errorMessage, setErrorMessage] = useState("")

    const walletTokens = useSelector( (state) => state.wallet.value)
    const tokensList = useSelector( (state) => state.wallet.tokensList)
    const dispatch = useDispatch();

    const findTokenInList = (list) => {
        const cleanedName = nameInput.value.toLowerCase();
        return list.find(
            (token) => {
              return (
                cleanedName === token.name.toLowerCase() ||
                cleanedName === token.symbol.toLowerCase() ||
                cleanedName === token.id.toLowerCase()
              )
            }
        );
    };

   const nameInputValueHandler = (event) => {
    if (!nameInput.validity) {
      setNameInput((previousState) => ({...previousState, validity: true}))
    }
    setNameInput((previousState) => ({...previousState, value: event.target.value}));
  };

  const nameInputValidityHandler = () => {

    const tokenFounded = findTokenInList(tokensList);
    if (tokenFounded)
    {
      const tokenAlreadyInWallet = findTokenInList(walletTokens);
      if (tokenAlreadyInWallet) {
        setNameInput({value: "", validity: false})
        setErrorMessage("Token already added to the wallet");
        return null;
      }
      return tokenFounded.id;
    }
    setNameInput({value: "", validity: false})
    setErrorMessage("Please, enter a valid name");
    return null;
  };

  const amountInputValueHandler = (event) => {
      if (!amountInput.validity) {
        setAmountInput((previousState) => ({...previousState, validity: true}))
      }
      setAmountInput((previousState) => ({...previousState, value: event.target.value}));
  };

  const amountInputValidityHandler = () => {
    if (amountInput.value > 0 && amountInput.value < Number.MAX_VALUE)
      return true;
    setAmountInput({value: 0, validity: false})
    return false;
  };

  const constructDate = () => {
    const date = new Date().toDateString()

    return date.substring(date.search(" "));
  }

  const submitFormHandler = (event) => {
    event.preventDefault();

    const itemID = nameInputValidityHandler();
    if (!amountInputValidityHandler() || !itemID)
      return
    
    const itemHistoryCreation = [{date: constructDate(), amount: amountInput.value}];

    dispatch(AddNewTokenToWallet({id: itemID, amount: amountInput.value, history: itemHistoryCreation}));
    setNameInput({value: "", validity: true});
    setAmountInput({value: 0, validity: true});
  };

  return (
    <Card>
      <form
        className={classes.form}
        onSubmit={submitFormHandler}
      >
        <div className={classes["inputs-container"]}>
          <NameInput
            data={nameInput}
            onChange={nameInputValueHandler}
            errorMessage={errorMessage}
          />
            <AmountInput
              data={amountInput}
              onChange={amountInputValueHandler}
            />
        </div>
        <SubmitButton />
      </form>
    </Card>
  );
};

export default AddItemForm;
