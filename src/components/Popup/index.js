import React from "react";
import LoginForm from "../Login";
import RegisterForm from "../Register";
import PasswordForm from "../Password";

const Popup = (props) => {
	const popups = {
		'Login': <LoginForm popupType={props.popupType}/>,
		'Register': <RegisterForm onChange={props.onChange} popupType={props.popupType}/>,
		'Password': <PasswordForm onChange={props.onChange} popupType={props.popupType}/>
	}

	return popups[props.popupType];
};

export default Popup;