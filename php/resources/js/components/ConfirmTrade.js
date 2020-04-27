import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getCurrentPrice} from './fetch/fetchStockPrices';

function ConfirmTrade() {
	const ticker = document.querySelector('#ticker-value');

	const [tradeInfo, setTradeInfo] = useState({
		ticker: ticker,
		num_shares: 1,
		current_price: null,
		value: null
	});

	useEffect(() => {
		const fetchData = async () => {
			getCurrentPrice(tradeInfo.ticker)
				.then(res => {
					
				})
				.catch(err => {
					console.log(err);
				});
		};
		fetchData();
	}, [tradeInfo.ticker]);

	return (
		<p>Here</p>
	);
}

if (document.getElementById('confirm-content')) {
    ReactDOM.render(<ConfirmTrade />, document.getElementById('confirm-content'));
}