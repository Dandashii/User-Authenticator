import React from "react";
import LoginForm from "./types/Login";
import RegisterForm from "./types/Register";
import PasswordForm from "./types/Password";

const PopupForm = (props) => {
	const popups = {
		'Login':
			<LoginForm
				notifyDisplay={props.notifyDisplay}
				notifyDesc={props.notifyDesc}
				onChange={props.handleChange}
				handleLogin={props.handleLogin}
				closePopup={props.closePopup}
				popupType={props.popupType}/>,
		'Register':
			<RegisterForm
				notifyDisplay={props.notifyDisplay}
				notifyDesc={props.notifyDesc}
				handleChange={props.handleChange}
				handleRegistration={props.handleRegistration}
				closePopup={props.closePopup}
				popupType={props.popupType}/>,
		'Password':
			<PasswordForm
				notifyDisplay={props.notifyDisplay}
				notifyDesc={props.notifyDesc}
				handleChange={props.handleChange}
				handlePassword={props.handlePassword}
				closePopup={props.closePopup}
				popupType={props.popupType}/>
	}
	return popups[props.popupType];
}

export default PopupForm;