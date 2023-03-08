import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";
import {sendData} from "../../utils/api";
import {displayPopup} from "../../utils/popup";
import PopupForm from "../../components/Popup";
import '../../assets/styling/pages/_profile.scss';
import {Navigate} from "react-router-dom";

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: 'Profile Page',
			popupType: '',
			displayPopup: false,
			loggedIn: true,
			formData: {},
			user: {
				name: '',
				email: '',
				password: ''
			},
			notification: {
				type: '',
				message: '',
				display: false
			}
		};
	}

	componentDidMount() {
		const userData = sessionStorage.getItem('user');
		if (userData) {
			this.setState({ user: JSON.parse(userData), loggedIn: true});
		} else {
			this.setState({loggedIn: false});
		}
	}

	componentWillUnmount() {
		this.clearStates();
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

	handleLogout = (event) => {
		sessionStorage.clear();
		this.setState({
			loggedIn: false
		});
	}

	handlePassword = (event) => {
		event.preventDefault();
		const formData = {
			email: this.state.user.email,
			password: this.state.formData.password,
			newPassword: this.state.formData.newPassword,
			confirmPassword: this.state.formData.confirmPassword
		};


		const onSuccess = () => {
			this.setState({
				notification: {
					type: 'Password',
					message: 'Password changed successfully!',
					display: true
				}
			});

			setTimeout(() => {
				this.clearStates();
				const userData = sessionStorage.getItem('user');
				this.setState({ user: JSON.parse(userData), loggedIn: true});
			}, 2000);
		};

		sendData(this, event, formData, 'reset-password.php', onSuccess);
	}

	handleChange = (event) => {
		this.setState((previousState) => {
			let formData = {...previousState.formData};
			formData[event.target.name] = event.target.value;
			return {
				formData,
				notification: {
					display: false
				}
			}
		});
	}

	render() {
		if (this.state.loggedIn === false) {
			return <Navigate to="/"/>;
		}

		return (
			<>
				<Header pageTitle={this.state.pageTitle}/>

				{!this.state.displayPopup &&
				<section className={'profile-container'}>
					<div className={'profile-logged-header'}>
						<p>YOU ARE CURRENTLY LOGGED IN AS</p>
					</div>
					<div className={'profile-data-container'}>
						<h3>{this.state.user.name}</h3>

						<div className={'data-container profile-email-container'}>
								<iconify-icon icon={'mdi:email'}></iconify-icon>
							<div className={'profile-text-container profile-email'}>
								<span>
									{this.state.user.email}
								</span>
							</div>
						</div>

						<div className={'data-container profile-password-container'}>
							<iconify-icon icon={'mdi:password'}></iconify-icon>
							<div className={'profile-text-container profile-password'}>
								<span>
									{this.state.user.password.replace(/./g, "*")}
								</span>
							</div>
						</div>

						<button onClick={() => displayPopup(this,'Password')} type={'button'} className={'change-password-btn'}>
							Change Password
						</button>

						<button onClick={this.handleLogout} className={'logout-btn'}>LOGOUT</button>
					</div>
				</section>}

				{this.state.displayPopup &&
					<PopupForm
						notifyDisplay={this.state.notification.display}
						notifyDesc={this.state.notification.message}
						closePopup={() => this.clearStates()}
						handleChange={this.handleChange}
						handlePassword={this.handlePassword}
						popupType={this.state.popupType}/>}

				<Footer/>
			</>
		);
	}
}