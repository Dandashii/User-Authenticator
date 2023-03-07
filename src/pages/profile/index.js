import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";
import {sendData} from "../../utils/api";
import {displayPopup} from "../../utils/popup";
import {closePopup} from "../../utils/popup";
import PopupForm from "../../components/Popup";
import '../../assets/styling/pages/_profile.scss';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: 'Profile Page',
			popupType: '',
			displayPopup: false,
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
		axios.get('http://localhost:8080/getUser.php')
			.then(response => {
				if(response.data.notification) {
					window.location.href = 'http://localhost:3000/';
					console.log(response.data);
				} else {
					console.log(response.data);
					this.setState({
						user: {
							name: response.data.name,
							email: response.data.email,
							password: response.data.password
						}
					});
				}
			}).catch(error => {
			console.log(error);
		});
	}

	componentWillUnmount() {
		this.clearStates();
	}

	clearStates = () => {
		this.setState({
			displayPopup: false,
			popupType: '',
			user: {
				name: '',
				email: '',
				password: ''
			}
		})
	}

	handleLogout = (event) => {
		const onSuccess = () => {
			window.location.href = 'http://localhost:3000/'
		}

		sendData(this, event, {}, 'logout.php', onSuccess);
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

	render() {
		return (
			<>
				<Header pageTitle={this.state.pageTitle}/>

				{!this.state.displayPopup &&
				<section className={'profile-container'}>
					<h3>{this.state.user.name}</h3>

					<div className={'profile-email-container'}>
						<div className={'profile-label-container'} style={{borderLeft: '5px solid black'}}>
							<iconify-icon icon={'mdi:email'}></iconify-icon>
						</div>
						<p className={'profile-text-container profile-email'}>{this.state.user.email}</p>
					</div>

					<div className={'profile-password-container'}>
						<div className={'profile-label-container'} style={{borderLeft: '5px solid black'}}>
							<iconify-icon icon={'mdi:email'}></iconify-icon>
						</div>
						<p className={'profile-text-container profile-password'}>{this.state.user.password}</p>
					</div>

					<button onClick={() => displayPopup(this,'Password')} type={'button'} className={'change-password-btn'}>
						Change Password
					</button>

					<button onClick={this.handleLogout} className={'logout-btn'}>LOGOUT</button>
				</section>}

				{this.state.displayPopup &&
					<PopupForm
						notifyDisplay={this.state.notification.display}
						notifyDesc={this.state.notification.message}
						closePopup={() => closePopup(this)}
						handleChange={this.handleChange}
						handlePassword={this.handlePassword}
						popupType={this.state.popupType}/>}

				<Footer/>
			</>
		);
	}
}