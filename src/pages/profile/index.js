import React from "react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import axios from "axios";

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.handleLogout = this.handleLogout.bind(this)
	}

	handleLogout() {
		axios.post('http://localhost:8080/logout.php')
			.then(response => {
				if(response.data.error) {
					this.setState({
						error: {
							target: response.data.error.target,
							type: response.data.error.type,
							desc: response.data.error.desc,
							display: true,
						}
					});
				} else {

				}
			}).catch(error => {
			console.error(error);
		});
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
				<Footer/>
			</>
		);
	}
}