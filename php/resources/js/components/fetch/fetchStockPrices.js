const baseUrl = document.querySelector('#stocksBaseUrl').value;

const endpointMappings = {
	'historical': 'historical_information',
	'current': 'latest_information',
};

const getParams = (ticker) => {
	return '?ticker=' + ticker;
};

const getUri = (request_type, ticker) => {
	return baseUrl + endpointMappings[request_type] + getParams(ticker);
};

const issueRequest = (uri) => {
	return fetch(uri, {mode: 'cors'})
		.then(response => {
			return response.json();
		})
		.catch(err => {
			console.log(err);
			return null;
		});
};

export const getCurrentPrice = (ticker) => {
	return issueRequest(getUri('current', ticker))
		.then(response => {
			const keys = Object.keys(response);
			return response[keys[0]]['1. open'];
		})
		.catch(err => {
			console.log(err);
			return new Promise((resolve, reject) => {
				reject(err);
			})
		})
};

export const getRecentPrices = (ticker) => {
	return issueRequest(getUri('current', ticker))
};

export const getHistoricalPrices = (ticker) => {
	return issueRequest(getUri('historical', ticker));
};