import React, { useState,Fragment, useContext } from "react";
import ValidationButton from "../../UI/Buttons/ValidationButton";
import CancelationButton from "../../UI/Buttons/CancelationButton";
import ModifyItemModal from "../ModifyItemModal/ModifyItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import ItemInfos from "../ItemInfos/ItemInfos";
import { useDispatch } from "react-redux";
import { ModifyItemIntoWallet, RemoveItemFromWallet } from "../../../store/Wallet/wallet-actions";
import ThemeContext from "../../../store/Theme/theme-context";

import classes from "./TokenSummary.module.css";

const TokenSummary = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const [modifiedToken, setModifiedToken] = useState({
    amountValue: 0,
    isAmountValid: true,
  });

  const dispatch = useDispatch();

  const themeCtx = useContext(ThemeContext);

  const amountValueEventHandler = (event) => {
    if (!modifiedToken.isAmountValid)
      setModifiedToken((previousState) => ({
        ...previousState,
        isAmountValid: true,
      }));
    setModifiedToken((previousState) => ({
      ...previousState,
      amountValue: event.target.value,
    }));
  };

  const modifyItemHandler = () => {
    setIsModified(true);
  };

  const deleteItemHandler = () => {
    setShowModal(true);
  };

  const confirmDeleteItem = () => {
    dispatch(RemoveItemFromWallet(props.token.key));
    setShowModal(false);
  };

  const amountValidityCheck = () => {
    if (
      modifiedToken.amountValue > 0 &&
      modifiedToken.amountValue < Number.MAX_VALUE
    )
      return true;
    setModifiedToken((previousState) => ({
      ...previousState,
      amountValue: 0,
      isAmountValid: false,
    }));
    return false;
  };

  const confirmModifyItem = (event) => {
    event.preventDefault();

    if (!amountValidityCheck()) return;

    dispatch(
      ModifyItemIntoWallet(props.token.key, {
        id: props.token.id,
        amount: modifiedToken.amountValue,
      })
    );
    setModifiedToken((previousState) => ({ ...previousState, amountValue: 0 }));
    setIsModified(false);
  };

  const cancelDeleteItem = () => {
    setShowModal(false);
    setIsModified(false);
    setModifiedToken((previousState) => ({
      ...previousState,
      isAmountValid: true,
    }));
  };

  const firstItemClass =  !themeCtx.lightTheme? classes["first-light"] : classes.first;

  return (
    <React.Fragment>
      {isModified && (
        <ModifyItemModal
          modifiedItem={modifiedToken}
          tokenName={props.token.name}
          confirmModifyItem={confirmModifyItem}
          amountValueEventHandler={amountValueEventHandler}
          cancelModification={cancelDeleteItem}
        />
      )}
      {showModal && (
        <DeleteItemModal
          confirmDeletion={confirmDeleteItem}
          cancelDeletion={cancelDeleteItem}
        />
      )}
      <Fragment>
        <li className={`${classes["token-container"]} ${!themeCtx.lightTheme? classes["dark-theme"]  : ""} ${props.index === 0 ? firstItemClass : ""}`}>
          <ItemInfos
            item = {props.token}
          />
          <div className={classes["buttons-container"]}>
            <ValidationButton onClick={modifyItemHandler}>
              Modify Amount
            </ValidationButton>
            <CancelationButton onClick={deleteItemHandler}>
               Delete Coin
            </CancelationButton>
          </div>
        </li>
      </Fragment>
    </React.Fragment>
  );
};

export default TokenSummary;
