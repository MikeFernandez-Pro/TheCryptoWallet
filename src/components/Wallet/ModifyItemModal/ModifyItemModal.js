import Modal from "../../UI/Modal/Modal";
import ValidationButton from "../../UI/Buttons/ValidationButton"
import CancelationButton from "../../UI/Buttons/CancelationButton"

import classes from "./ModifyItemModal.module.css"

const ModifyItemModal = (props) => {

  return (
    <Modal>
      <h1 className={classes.title}>
        Enter the new amout of {props.tokenName}.
      </h1>
      <form className={classes.container} onSubmit={props.confirmModifyItem}>
        <input
          type="number"
          value={props.modifiedItem.amountValue}
          onChange={props.amountValueEventHandler}
        ></input>
        {!props.modifiedItem.isAmountValid && (
          <p className={classes.invalid}>Please enter a valid amount.</p>
        )}
        <div className={classes["buttons-container"]}>
          <ValidationButton type="submit">Validate</ValidationButton>
          <CancelationButton onClick={props.cancelModification}>
            Cancel
          </CancelationButton>
        </div>
      </form>
    </Modal>
  );
};

export default ModifyItemModal;
