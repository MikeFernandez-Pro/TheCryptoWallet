import { useReducer, useState } from "react";
import { useSelector} from "react-redux"

const findTokenInList = (input, list) => {
    const cleanedName = input.value.toLowerCase();
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

const useInput = (inputType) => {
  
    const defaultState = {
        value: inputType === "name" ? "" : 0,
        validity: true
    };

    const inputReducer = (state, action) => {
        if (action.type === "VALID")
            return {...state, validity: true};
        if (action.type === "UPDATE")
            return {...state, value: action.value};
        if (action.type === "INVALID")
            return {...defaultState, validity: false};
        if (action.type === "OVERWRITE")
            return {...state, value: action.value};
        if (action.type === "RESET")
            return defaultState;
        return defaultState;    
    };
    
    const walletTokens = useSelector( (state) => state.wallet.value)
    const tokensList = useSelector( (state) => state.wallet.tokensList)
    const [input, dispatchInput] = useReducer(inputReducer, defaultState);
    const [errorMessage, setErrorMessage] = useState("")

    const inputValueHandler = (event) => {
        if (!input.validity) {
            dispatchInput({type: "VALID"});
        }
        dispatchInput({type: "UPDATE", value: event.target.value});
    };
    
    const inputValueOverwrite = (newValue) => {
      dispatchInput({type: "OVERWRITE", value: newValue});
    };

    const nameInputValidityHandler = () => {
        const tokenFounded = findTokenInList(input, tokensList);
        if (tokenFounded)
        {
          const tokenAlreadyInWallet = findTokenInList(input, walletTokens);
          if (tokenAlreadyInWallet) {
            dispatchInput({type: "INVALID"})
            setErrorMessage("Coin already present in the wallet");
            return null;
          }
          return tokenFounded.id;
        }
        dispatchInput({type: "INVALID"})
        setErrorMessage("Invalid Name");
        return null;
      };

      const amountInputValidityHandler = () => {
        if (input.value > 0 && input.value < Number.MAX_VALUE)
          return true;
        dispatchInput({type: "INVALID"})
        return false;
      };
      
    const resetInputHandler = () => {
        dispatchInput({type: "RESET"});
    };

      return {
        input,
        inputValueHandler,
        nameInputValidityHandler,
        amountInputValidityHandler,
        resetInputHandler,
        inputValueOverwrite,
        errorMessage
    };

}

export default useInput;