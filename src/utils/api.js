import axios from "axios";

 export const sendData = (event, data, server, onSuccess) => {
	axios.post('http://localhost:8080/' + server, data)
		.then(response => {
			if (response.data.error) {
				this.setState({
					notification: {
						type: response.data.error.type,
						message: response.data.error.message,
						display: true,
					}
				});
			} else {
				this.clearStates();
				event.target.reset();
				onSuccess();
			}
		}).catch(error => {
		console.error(error);
	});
}