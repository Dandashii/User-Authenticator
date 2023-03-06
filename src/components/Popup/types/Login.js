import React from "react";
import Notification from "../../Notification";
const LoginForm = (props) => {
	return (
		<form className={'popup-form login-form'} method={'POST'} onSubmit={props.handleLogin}>
			<fieldset>
				<legend>LOGIN FORM</legend>

				<button type={'button'} onClick={props.closePopup}>
					<iconify-icon className={'closeButton'} icon={'clarity:close-line'}></iconify-icon>
				</button>

				<div className={'email-container'}>
					<div className={'label-container'}>
						<label htmlFor="email">
							<iconify-icon icon={'ic:baseline-email'}></iconify-icon>
							Email
						</label>
					</div>
					<input onChange={props.onChange} type="email" name={'email'} id={'email'} placeholder={'Please enter your email here'}/>
				</div>

				<div className={'password-container'}>
					<div className={'label-container'}>
						<label htmlFor="password">
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							Password
						</label>
					</div>
					<input onChange={props.onChange} type="password" name={'password'} id={'password'} placeholder={'Please enter your password here'}/>
				</div>

				<input type={'submit'} name={'login'} id={'login'} value={'Login'}/>
			</fieldset>

			{props.notifyDisplay && <Notification notifyDesc={props.notifyDesc}/>}
		</form>
	);
};

export default LoginForm;