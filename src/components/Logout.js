import React from "react";
import axios from 'axios';
export default class LogoutButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		axios.post('http://localhost:8080/logout.php')
			.then(response => {

			}).catch(error => {
			console.error(error);
		});
	}
	render() {
		return (
			<>

			</>
		);

	}
}
