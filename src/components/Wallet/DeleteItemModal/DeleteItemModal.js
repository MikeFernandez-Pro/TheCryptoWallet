import Modal from "../../UI/Modal/Modal";
import ValidationButton from "../../UI/Buttons/ValidationButton"
import CancelationButton from "../../UI/Buttons/CancelationButton"

import classes from "./DeleteItemModal.module.css"

const DeleteItemModal = (props) => {

    return (
        <Modal>
            <p>Are you sure?</p>
            <div className={classes["buttons-container"]}>
                <ValidationButton onClick={props.confirmDeletion}>
                    Yes
                </ValidationButton>
                <CancelationButton onClick={props.cancelDeletion}>
                    No
                </CancelationButton>
            </div>
        </Modal>

    );
};

export default DeleteItemModal;