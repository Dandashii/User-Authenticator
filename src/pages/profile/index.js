import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";
import {sendData} from "../../utils/api";
import {displayPopup} from "../../utils/popup";
import {closePopup} from "../../utils/popup";
import PopupForm from "../../components/Popup";

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: 'Profile Page',
			popup: '',
			displayPopup: false,
			user: {
				name: '',
				email: '',
				password: ''
			}
		};
	}

	componentDidMount() {
		axios.get('http://localhost:8080/getProfile.php')
			.then(response => {
				this.setState({
					user: {
						name: response.data.name,
						email: response.data.password,
						password: response.data.password
					}
				});
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

	handleLogout() {
		sendData();
	}

	render() {
		return (
			<>
				<Header/>
				<div className={'profile-container'}>

					<button type={'submit'} className={'logout-btn'} onClick={this.handleLogout}>
						LOGOUT
					</button>
				</div>
				<PopupForm/>
				<Footer/>
			</>
		);
	}
}