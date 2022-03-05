import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import ThemeContext from "../../../store/Theme/theme-context";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
	return <div className={classes.backdrop}></div>
};

const ModalOverlay = (props) => {
	const themeCtx = useContext(ThemeContext);

	return <div className={`${classes.modal} ${!themeCtx.lightTheme ? classes["dark-mode"] : ""}`}>
		<div className={classes.content}>
			{props.children}
		</div>
	</div>
};

const portalElement = document.getElementById("overlays")

const Modal = (props) => {		

	return (
		<Fragment>
			{ReactDOM.createPortal(<Backdrop/>, portalElement)}
			{ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
		</Fragment>
	);
};

export default Modal;