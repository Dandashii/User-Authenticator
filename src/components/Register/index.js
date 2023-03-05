import React from "react";

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.handleRegistration = this.handleRegistration.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
	}

	handleRegistration() {

	}

	render() {
		return (
			<form className={'popup-form register-form'} method={'POST'} onSubmit={this.handleRegistration}>

				<input type="text"/>
			</form>
		);
	}
}