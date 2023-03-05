import React from "react";

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.handleLogin = this.handleLogin.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
	}

	handleLogin() {

	}

	render() {
		return (
			<form className={'popup-form login-form'} method={'POST'} onSubmit={this.handleLogin}>
			</form>
		);
	}
}