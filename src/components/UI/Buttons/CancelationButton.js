import classes from "./CancelationButton.module.css"

const CancelationButton = (props) => {
    
    return (
        <button
            className={`${classes["cancelation-button"]}`}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default CancelationButton;