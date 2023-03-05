import React from "react";

export default class Password extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.handlePassword = this.handlePassword.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
	}

	handlePassword() {

	}

	render() {
		return (
			<form className={'popup-form password-form'} method={'POST'} onSubmit={this.handlePassword}>
				<input type="text"/>
			</form>
		);
	}
}