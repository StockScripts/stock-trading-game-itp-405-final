import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getCurrentPrice} from './fetch/fetchStockPrices';

function ConfirmTrade() {
	const ticker = document.querySelector('#ticker-value').value;

	const csrf_token = document.querySelector('#csrf-token').content;

	const validActions = [
		'buy',
		'sell'
	];

	const [tradeInfo, setTradeInfo] = useState({
		ticker: ticker,
		num_shares: 1,
		current_price: null,
		value: null,
		last_updated: null,
		type: validActions[0]
	});

	useEffect(() => {
		const fetchData = async () => {
			console.log('here');
			getCurrentPrice(tradeInfo.ticker)
				.then(res => {
					setTradeInfo({
						...tradeInfo,
						current_price: res,
						value: res * tradeInfo.num_shares,
						last_updated: Date.now()
					});
				})
				.catch(err => {
					console.log(err);
				});
		};
		fetchData();
	}, [tradeInfo.ticker, tradeInfo.num_shares]);

	const handleUpdate = (event) => {
		const new_num_shares = document.querySelector('#update-num-shares').value;
		const new_ticker = document.querySelector('#update-ticker').value;
		console.log('in handle update');
		event.preventDefault();
		setTradeInfo({
			...tradeInfo,
			ticker: new_ticker,
			num_shares: new_num_shares
		});
	}

	return (
		<Fragment>
		<div className="container w-50 p-5 pb-2 m-auto text-center bg-white">
			<p className="h3 p-2">Trade Preview:</p>
			<div className="row p-2">
				<div className="col-md">
					<p>Ticker: {tradeInfo.ticker}</p>
					<p>Number Shares: {tradeInfo.num_shares}</p>
					<p>Current Price: {tradeInfo.current_price ? parseFloat(tradeInfo.current_price).toFixed(2) : 'loading...'}</p>
					<p>Current Value: {tradeInfo.value ? parseFloat(tradeInfo.value).toFixed(2) : 'loading...'}</p>
				</div>
				<div className="col-md text-center float-right m-2">
					<form action="#" method="post">
						<div className="btn btn-secondary m-1" onClick={handleUpdate}>Update Totals</div>
					</form>
				</div>
			</div>
			<p>*Note: This trade will be executed at market price on submit. Please ensure you are using up to date information.</p>
			<p>*Note: This simulator does not account for market hours nor trading volume. It is based off of open price data.</p>
		</div>
		</Fragment>
	);
}

if (document.getElementById('confirm-content')) {
    ReactDOM.render(<ConfirmTrade />, document.getElementById('confirm-content'));
}