import React from "react";
import Popup from "../../components/Popup";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageTitle: 'Homepage',
			displayPopup: false,
			popupType: ''
		};
		this.displayPopup = this.displayPopup.bind(this);
	}

	displayPopup = (popupType) => {
		this.setState({
			popupType: popupType,
			displayPopup: true
		});
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

				{this.state.displayPopup && <Popup popupType={this.state.popupType}/>}

				<Footer/>
			</>
		);
	}
}