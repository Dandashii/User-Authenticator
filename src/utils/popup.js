export const displayPopup = (thisArg, popupType) => {
	thisArg.setState({
		popupType: popupType,
		displayPopup: true
	});
}

export const closePopup = (thisArg) => {
	thisArg.setState({
		popupType: '',
		displayPopup: false
	});
}