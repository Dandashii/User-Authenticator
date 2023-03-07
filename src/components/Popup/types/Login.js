import React from "react";
import Notification from "../../Notification";
const LoginForm = (props) => {
	return (
		<form className={'popup-form login-form'} method={'POST'} onSubmit={(event) => props.handleLogin(event)}>
			<button className={'close-popup-btn'} type={'button'} onClick={props.closePopup}>
				<iconify-icon icon={'clarity:close-line'}></iconify-icon>
			</button>

			<h3>LOGIN FORM</h3>

			<div className={'input-container email-container'}>
				<div className={'label-container'}>
					<label htmlFor="email">
						<iconify-icon icon={'ic:baseline-email'}></iconify-icon>
						Email
					</label>
				</div>
				<input onChange={props.onChange} type="email" name={'email'} id={'email'} placeholder={'Please enter your email here'}/>
			</div>

			<div className={'input-container password-container'}>
				<div className={'label-container'}>
					<label htmlFor="password">
						<iconify-icon icon={'mdi:password'}></iconify-icon>
						Password
					</label>
				</div>
				<input onChange={props.onChange} type="password" name={'password'} id={'password'} placeholder={'Please enter your password here'}/>
			</div>

			{props.notifyDisplay && <Notification notifyDesc={props.notifyDesc}/>}

			<input type={'submit'} name={'login'} id={'login'} value={'Login'}/>
		</form>
	);
};

export default LoginForm;