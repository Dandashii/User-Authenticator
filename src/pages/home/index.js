import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import PopupForm from "../../components/Popup";
import axios from "axios";
import {sendData} from "../../utils/api";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: 'Homepage',
			displayPopup: false,
			popupType: '',
			formData: {},
			notification: {
				type: '',
				message: '',
				display: false
			}
		};
	}

	displayPopup = (popupType) => {
		this.setState({
			popupType: popupType,
			displayPopup: true
		});
	}

	closePopup = () => {
		this.setState({
			popupType: '',
			displayPopup: false
		});
	}

	clearStates = () => {
		this.setState({
			displayPopup: false,
			popupType: '',
			formData: {},
			notification: {
				type: '',
				message: '',
				display: false
			}
		})
	}

	componentWillUnmount() {
		this.clearStates();
	}

	handleChange = (event) => {
		this.setState((previousState) => {
			let formData = {...previousState.formData};
			formData[event.target.name] = event.target.value;
			return {
				formData
			}
		});
		console.log(this.state);
	}

	handleLogin = (event) => {
		event.preventDefault();
		const formData = {
			email: this.state.formData.email,
			password: this.state.formData.password,
		};

		const onSuccess = () => {
			window.location.href = 'http://localhost:3000/profile';
		}

		sendData(event, formData, 'login.php', onSuccess);
	}

	handlePassword = (event) => {
		event.preventDefault();
		const formData = {
			password: this.state.formData.password,
			newPassword: this.state.formData.newPassword,
			confirmPassword: this.state.formData.confirmPassword
		};

		sendData(event, formData, 'reset-password.php');
	}

	handleRegistration = (event) => {
		event.preventDefault();
		const formData = {
			name: this.state.formData.name,
			email: this.state.formData.email,
			password: this.state.formData.password,
			confirmPassword: this.state.formData.confirmPassword
		};

		const onSuccess = () => {
			this.setState({
				displayPopup: true,
				popupType: 'Login'
			});
		};

		sendData(event, formData, 'register.php', onSuccess);
	}

	render() {
		return (
			<>
				<Header pageTitle={this.state.pageTitle}/>

				{!this.state.displayPopup &&
				<button onClick={() => this.displayPopup('Login')} type={'button'} className={'popup-button login-popup-btn'}>
					LOGIN
					<iconify-icon icon={'material-symbols:login-sharp'}></iconify-icon>
				</button>}

				{!this.state.displayPopup &&
				<button onClick={() => this.displayPopup('Register')} type={'button'} className={'popup-button register-popup-btn'}>
					REGISTER
					<iconify-icon icon={'material-symbols:login-sharp'}></iconify-icon>
				</button>}

				{this.state.displayPopup &&
					<PopupForm
						notifyDisplay={this.state.notification.display}
						notifyDesc={this.state.notification.message}
						closePopup={this.closePopup}
						handleChange={this.handleChange}
						handleLogin={this.handleLogin}
						handlePassword={this.handlePassword}
						handleRegistration={this.handleRegistration}
						popupType={this.state.popupType}/>}

				<Footer/>
			</>
		);
	}
}