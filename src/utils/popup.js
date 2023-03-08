export const displayPopup = (thisArg, popupType) => {
	thisArg.setState({
		popupType: popupType,
		displayPopup: true
	});
}
