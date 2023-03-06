export const displayPopup = (popupType) => {
	this.setState({
		popupType: popupType,
		displayPopup: true
	});
}

export const closePopup = () => {
	this.setState({
		popupType: '',
		displayPopup: false
	});
}