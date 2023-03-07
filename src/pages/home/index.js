import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import PopupForm from "../../components/Popup";
import axios from "axios";
import {sendData} from "../../utils/api";
import {closePopup, displayPopup} from "../../utils/popup";
import '../../assets/styling/pages/_home.scss';

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

		sendData(this, event, formData, 'login.php', onSuccess);
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
			displayPopup(this, 'Login');
		};

		sendData(this, event, formData, 'register.php', onSuccess);
	}

	render() {
		return (
			<>
				<Header pageTitle={this.state.pageTitle}/>

				{!this.state.displayPopup &&
				<div className={'popup-btns-container'}>
					<button onClick={() => displayPopup(this, 'Login')} type={'button'} className={'popup-button login-popup-btn'}>
						LOGIN
						<iconify-icon icon={'material-symbols:login-sharp'}></iconify-icon>
					</button>

					<button onClick={() => displayPopup(this,'Register')} type={'button'} className={'popup-button register-popup-btn'}>
						REGISTER
						<iconify-icon icon={'mdi:register'}></iconify-icon>
					</button>
				</div>}

				{this.state.displayPopup &&
					<PopupForm
						notifyDisplay={this.state.notification.display}
						notifyDesc={this.state.notification.message}
						closePopup={() => closePopup(this)}
						handleChange={this.handleChange}
						handleLogin={this.handleLogin}
						handleRegistration={this.handleRegistration}
						popupType={this.state.popupType}/>}

				<Footer/>
			</>
		);
	}
}