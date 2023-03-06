import React from "react";
import Notification from "../../Notification";
const PasswordForm = (props) => {
	return (
		<form className={'popup-form password-form'} method={'POST'} onSubmit={props.handlePassword}>
			<fieldset>
				<legend>Change Password</legend>

				<button type={'button'} onClick={props.closePopup}>
					<iconify-icon className={'closeButton'} icon={'clarity:close-line'}></iconify-icon>
				</button>

				<div className={'password-container'}>
					<div className={'label-container'}>
						<label htmlFor="password">
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							Password
						</label>
					</div>
					<input onChange={props.onChange} type="password" name={'password'} id={'password'} placeholder={'Please enter your password here'}/>
				</div>

				<div className={'new-password-container'}>
					<div className={'label-container'}>
						<label htmlFor="newPassword">
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							New Password
						</label>
					</div>
					<input onChange={props.onChange} type="password" name={'newPassword'} id={'newPassword'} placeholder={'Please enter a new password here'}/>
				</div>

				<div className={'confirm-password-container'}>
					<div className={'label-container'}>
						<label htmlFor="confirmPassword">
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							Confirm Password
						</label>
					</div>
					<input onChange={props.onChange} type="password" name={'confirmPassword'} id={'confirmPassword'} placeholder={'Please confirm your new password'}/>
				</div>

				<input type={'submit'} name={'register'} id={'register'} value={'Register'}/>
			</fieldset>
			{props.notifyDisplay && <Notification notifyDesc={props.notifyDesc}/>}
		</form>
	);
};

export default PasswordForm;