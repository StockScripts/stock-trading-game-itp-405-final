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
	return issueRequest(getUri('current', ticker));
};

export const getRecentPrices = (ticker) => {
	return issueRequest(getUri('current', ticker))
};

export const getHistoricalPrices = (ticker) => {
	return issueRequest(getUri('historical', ticker));
};