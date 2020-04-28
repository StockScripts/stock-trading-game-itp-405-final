import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getCurrentPrice} from './fetch/fetchStockPrices';
import InteractiveChart from './charts/InteractiveChart';

function Home() {
	const [holdings, setHoldings] = useState({
		holdings: [],
		loading: true
	});

	const transactions_data = JSON.parse(document.querySelector('#transactions-values').value);
	const holdings_data = JSON.parse(document.querySelector('#holdings-values').value);
	const balance = JSON.parse(document.querySelector('#balance-value').value);
	const username = document.querySelector('#username-value').value;

	console.log(transactions_data);

	// Display holdings
	const getHoldingsJsx = (h) => {
		if (!h || h.length === 0) {
			return <Fragment>
				<p>You currently do not have any holdings...</p>	
			</Fragment>;
		}
		return h.map(holding =>(
			<div className="container">
				<div className="row m-auto">
					<div className="col=sm p-3">
						<p>Ticker: {holding.ticker}</p>
						<p>Price: {holding.price}</p>
					</div>
					<div className="col=sm p-3">
						<p>Num Shares: {holding.num_shares}</p>
						<p>Total Value: {holding.value}</p>
					</div>	
				</div>	
			</div>
		));
	};

	// Displaying transactions
	const getTransactionsJsx = (t) => {
		if (!t || t.length === 0) {
			return <Fragment>
				<p>No recent transactions to display...</p>
			</Fragment>;
		}
		return t.map(transaction => (
			<div className="container">
				<div className="row">
					<div className="col-sm">
						test
					</div>	
					<div className="col-sm">
						test	
					</div>
				</div>	
			</div>
		));
	};

	// Logic for redirecting to make a trade
	const handleTrade = (event) => {
		event.preventDefault();
		const ticker_input = document.querySelector('#buy-ticker-input').value;
		console.log(ticker_input);
		if (ticker_input) {
			window.location.replace('/confirm_trade/' + ticker_input);
		}
	}
	const getMakeTradeJsx = () => (
		<Fragment>
			<form onSubmit={handleTrade}>
				<input type="text" id="buy-ticker-input"/>
				<button>Trade</button>
			</form>
		</Fragment>
	);

	// Fetch data on holdings
	useEffect(() => {
		const fetchDataSingle = async (holding) => {
			const res = await getCurrentPrice(holding.ticker);
			return {
				ticker: holding.ticker,
				price: res,
				num_shares: holding.num_shares,
				value: res*holding.num_shares
			};	
		};
		const fetchDataMulti = async () => {
			if (!holdings_data) {
				return new Promise((resolve, reject) => {
					resolve([]);
				});
			}
			return Promise.all(holdings_data.map(holding => {
				return fetchDataSingle(holding);
			}));
		};
		const fetchData = async () => {
			fetchDataMulti()
				.then(results => {
					setHoldings({
						holdings: results,
						loading: false
					});
				})
				.catch(err => {
					console.log(err);
				});
		};
		fetchData();
	}, []);

	let total_value = 0;
	let content;
	if (holdings.loading) {
		content = <div className="m-auto text-center h3">
			<p>
				Loading...
			</p>
		</div>	
	}
	else {
		holdings.holdings.forEach(holding => {
			total_value += holding.value;
		});
		total_value += balance;
		content = <div className="m-auto text-center container">
			<div className="row">
				<div className="col-sm">
					<p className="h3 mb-2">Welcome, <div className="text-primary d-inline">{username}</div>!</p>
					<p className="h5">Your account value is ${total_value}.</p>
					<p className="h5">You currently have ${balance} spending power.</p>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<p>Holdings:</p>
					{getHoldingsJsx(holdings.holdings)}
				</div>
				<div className="col-sm">
					<p>Recent Transactions:</p>
					{getTransactionsJsx(transactions_data)}
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<p>Check Charts:</p>
					<InteractiveChart />
				</div>
				<div className="col-sm">
					<p>Make Trade:</p>
					{getMakeTradeJsx()}
				</div>				
			</div>
		</div>;
	}
	return (
		<Fragment>
			{content}
		</Fragment>
	);
}

if (document.getElementById('home-content')) {
    ReactDOM.render(<Home />, document.getElementById('home-content'));
}