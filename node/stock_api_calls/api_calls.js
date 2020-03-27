const rp = require('request-promise');

const tickerRegex = RegExp('^[a-zA-Z.]*$');
const ALPHA_URI = 'https://www.alphavantage.co/query?';

/**
 * fetchIntraDayData() - get intra day stock data for a given stock
 * 						 uses Alpha Vantage api
 *
 * @link https://www.alphavantage.co/documentation/ 
 * @param  {Object} options:
 *         				- symbol (required): {ticker}
 *         				- interval (default=5min): {'1min', '5min', '15min', '30min', '60min'}
 *         				- apikey (required): {apikey from Alpha Vantage}
 * @return Promise w/ output upon success, error on failure
 */
module.exports.fetchIntraDayData = (options = {}) => {
	
	// Validation
	if (!Object.prototype.hasOwnProperty.call(options, 'symbol') || !tickerRegex.test(options.symbol)) {
		throw new Exception('Malformed stock ticker symbol.');
	}
	if (!Object.prototype.hasOwnProperty.call(options, 'apikey')) {
		throw new Exception('No API Key Provided');
	}
	if (!Object.prototype.hasOwnProperty.call(options, 'interval')) {
		options.interval = '5min';
	}

	// Issue request
	return rp({
		uri: ALPHA_URI + (new URLSearchParams({
				function: 'TIME_SERIES_INTRADAY',
				symbol: options.symbol,
				interval: options.interval,
				apikey: options.apikey
			}).toString()),
		method: 'GET',
		json: true
	});
};


/**
 * fetchHistoricalData()
 * 
 * @param  {Object} options:
 * 						- symbol (required): {ticker}
 * 						- apikey (required): {Alpha Vantage API Key}
 * @return Promise w/ output upon success, error upon failure
 */
module.exports.fetchHistoricalData = (options = {}) => {
	
	// Validation
	if (!Object.prototype.hasOwnProperty.call(options, 'symbol') || !tickerRegex.test(options.symbol)) {
		throw new Exception('Malformed stock ticker symbol.');
	}
	if (!options.hasOwnProperty('apikey')) {
		throw new Exception('Missing apikey param');
	}

	// Issue request
	return rp({
		uri: ALPHA_URI + (new URLSearchParams({
			function: 'TIME_SERIES_DAILY',
			symbol: options.symbol,
			apikey: options.apikey
		}).toString()),
		method: 'GET',
		json: true
	});
};
