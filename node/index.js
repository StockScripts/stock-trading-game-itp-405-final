require('dotenv').config();
const api_calls = require('./stock_api_calls/api_calls.js');
const express = require('express');
cors = require('cors');
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.get('/latest_price', function(req, res, next) {
	api_calls.fetchIntraDayData({
		symbol: req.query.ticker,
		interval: '1min',
		apikey: process.env.ALPHA_VANTAGE_API_KEY
	})
	.then(api_response => {
		const key = 'Time Series (' + api_response['Meta Data']['4. Interval'] + ')';
		const results_to_send = api_response[key];
		const latest_time = (Object.keys(results_to_send))[0];
		res.status(200);
		res.json(results_to_send[latest_time]);
	})
	.catch(err => {
		res.sendStatus(404);
		console.log(err);
	});
});

app.get('/latest_information', function(req, res, next) {
	api_calls.fetchIntraDayData({
		symbol: req.query.ticker,
		interval: '1min',
		apikey: process.env.ALPHA_VANTAGE_API_KEY
	})
	.then(api_response => {
		const key = 'Time Series (' + api_response['Meta Data']['4. Interval'] + ')';
		const results_to_send = api_response[key];
		res.status(200);
		res.json(results_to_send);
	})
	.catch(err => {
		res.sendStatus(404);
		console.log(err);
	});
});

app.get('/historical_information', function(req, res, next) {
	api_calls.fetchHistoricalData({
		symbol: req.query.ticker,
		apikey: process.env.ALPHA_VANTAGE_API_KEY
	})
	.then(api_response => {
		const key = 'Time Series (Daily)';
		const results_to_send = api_response[key];
		res.status(200);
		res.json(results_to_send);	
	})
	.catch(err => {
		res.sendStatus(404);
		console.log(err);
	});
});

app.get('/*', function(req, res, next) {
	res.sendStatus(404);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//app.get('/price', )
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