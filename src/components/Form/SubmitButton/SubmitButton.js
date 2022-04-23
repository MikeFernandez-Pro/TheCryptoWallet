import classes from "./SubmitButton.module.css"

const SubmitButton = () => {

    return (
        <div className={classes["submit-button-container"]}>
          <button type="submit" name="submit">APPEND</button>
        </div>
    );
};

export default SubmitButton;