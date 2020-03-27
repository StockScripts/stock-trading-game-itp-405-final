require('dotenv').config();
const api_calls = require('./stock_api_calls/api_calls.js');

/*

// Sample Call to Intra Day Data
api_calls.fetchIntraDayData({
	symbol: 'AAPL',
	interval: '1min',
	apikey: process.env.ALPHA_VANTAGE_API_KEY
})
.then(res => {
	const key = 'Time Series (' + res['Meta Data']['4. Interval'] + ')';
	const results_to_send = res[key];
	console.log(results_to_send);
})
.then(err => {
	console.log(err);
});

*/

/*

// Sample Call to Historical Data
api_calls.fetchHistoricalData({
	symbol: 'AAPL',
	apikey: process.env.ALPHA_VANTAGE_API_KEY
})
.then(res => {
	const key = 'Time Series (Daily)';
	const results_to_send = res[key];
	console.log(results_to_send);	
})
.catch(err => {
	console.log(err);
});

*/