import React from "react";
import Notification from "../../Notification";

const RegisterForm = (props) => {
	return (
		<form className={'popup-form register-form'} method={'POST'} onSubmit={props.handleRegistration}>
			<fieldset>
				<legend>REGISTRATION FORM</legend>

				<button type={'button'} onClick={props.closePopup}>
					<iconify-icon className={'closeButton'} icon={'clarity:close-line'}></iconify-icon>
				</button>

				<div className={'name-container'}>
					<div className={'label-container'}>
						<label htmlFor="name">
							<iconify-icon icon={'ic:baseline-email'}></iconify-icon>
							Full Name
						</label>
					</div>
					<input onChange={props.onChange} type="text" name={'name'} id={'name'} placeholder={'Please enter your full name here'}/>
				</div>

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

				<div className={'confirm-password-container'}>
					<div className={'label-container'}>
						<label htmlFor="confirmPassword">
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							Confirm Password
						</label>
					</div>
					<input onChange={props.onChange} type="password" name={'confirmPassword'} id={'confirmPassword'} placeholder={'Please confirm your password'}/>
				</div>

				<input type={'submit'} name={'register'} id={'register'} value={'Register'}/>
			</fieldset>
			{props.notifyDisplay && <Notification notifyDesc={props.notifyDesc}/>}
		</form>
	);
};

export default RegisterForm;