import axios from "axios";

 export const sendData = (thisArg, event, data, server, onSuccess) => {
	axios.post('http://localhost:8080/' + server, data)
		.then(response => {
			if (response.data.notification) {
				thisArg.setState({
					notification: {
						type: response.data.notification.type,
						message: response.data.notification.message,
						display: true,
					}
				});
			} else {
				thisArg.clearStates();
				event.target.reset();
				onSuccess();
			}
		}).catch(error => {
		console.error(error);
	});
}