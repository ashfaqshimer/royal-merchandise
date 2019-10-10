const catchErrors = (error, displayError) => {
	let errorMsg;

	if (error.response) {
		// Request was made and the server responded with a status code not in the range of 2xx
		errorMsg = error.response.data;
		console.error('Error response', errorMsg);

		// For Cloudinary image uploads
		if (error.response.data.error) {
			errorMsg = error.response.data.error.message;
		}
	} else if (error.request) {
		// The request was made, but no response was received
		errorMsg = error.request;
		console.error('Error request', errorMsg);
	} else {
		// Something else happened
		errorMsg = error.message;
		console.error('Error response', errorMsg);
	}
	displayError(errorMsg);
};

export default catchErrors;
