import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getCurrentPrice} from './fetch/fetchStockPrices';

function ConfirmTrade() {
	const ticker = document.querySelector('#ticker-value').value;

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
					let new_trade_info = tradeInfo;
					new_trade_info.current_price = res;
					new_trade_info.value = new_trade_info.current_price * new_trade_info.num_shares;
					setTradeInfo(new_trade_info);
				})
				.catch(err => {
					console.log(err);
				});
		};
		fetchData();
	}, [tradeInfo.ticker]);

	useEffect(() => {
		if (!tradeInfo.current_price || !tradeInfo.value) {
			return;
		}
		let new_trade_info = tradeInfo;
		new_trade_info.value = tradeInfo.current_price * tradeInfo.num_shares;
		setTradeInfo(new_trade_info);
	}, [tradeInfo.num_shares]);

	return (
		<Fragment>
		<div className="container">
			<form action="/confirm_trade" method="post">
				<div className="col-sm">
					<p>Ticker: {tradeInfo.ticker}</p>
					<p>Number Shares: {tradeInfo.num_shares}</p>
					<p>Current Price: {tradeInfo.current_price ? tradeInfo.current_price : ''}</p>
					<p>Current Value: {tradeInfo.value ? tradeInfo.value : ''}</p>
				</div>
				<div className="col-sm">
					<input type="text" id="update-ticker" name="update-ticker" value={tradeInfo.ticker}/>
					<input type="text" id="update-num-shares" name="update-num-shares" value={tradeInfo.num_shares}/>
					<button>Update Totals</button>
					<button>Submit Trade</button>
				</div>
			</form>
		</div>
		</Fragment>
	);
}

if (document.getElementById('confirm-content')) {
    ReactDOM.render(<ConfirmTrade />, document.getElementById('confirm-content'));
}