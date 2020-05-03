import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import {getCurrentPrice} from './fetch/fetchStockPrices';
import InteractiveChart from './charts/InteractiveChart';
import PriceInformation from './util/PriceInformation';

function Home() {
	const [holdings, setHoldings] = useState({
		holdings: [],
		loading: true
	});

	const [pagination, setPagination] = useState({
		holdings_index: 0,
		transactions_index: 0,
		max_results: 5
	});

	const transactions_data = JSON.parse(document.querySelector('#transactions-values').value);
	const holdings_data = JSON.parse(document.querySelector('#holdings-values').value);
	const balance = JSON.parse(document.querySelector('#balance-value').value);
	const username = document.querySelector('#username-value').value;

	const capitalize = (s) => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	// Display holdings
	const getHoldingsJsx = (h, i) => {
		if (!h || h.length === 0) {
			return <Fragment>
				<p>You currently do not have any holdings...</p>	
			</Fragment>;
		}
		return h.slice(i, i + pagination.max_results).map(holding =>(
			<div className="container bg-white border">
				<div className="row m-auto">
					<div className="col-sm p-1">
						<p>Ticker: {holding.ticker.toUpperCase()}</p>
						<p>Current Price: {holding.price}</p>
					</div>
					<div className="col-sm p-1">
						<p>Num Shares: {holding.num_shares}</p>
						<p>Total Value: {holding.value}</p>
					</div>	
				</div>	
			</div>
		));
	};

	// Displaying transactions
	const getTransactionsJsx = (t, i) => {
		if (!t || t.length === 0) {
			return <Fragment>
				<p>No recent transactions to display...</p>
			</Fragment>;
		}
		return t.slice(i, i + pagination.max_results).map(transaction => (
			<div className="container bg-white border">
				<div className="row m-auto">
					<div className="col-sm p-1">
						<p>{capitalize(transaction.type) + ' ' + transaction.ticker.toUpperCase()}</p>
						<p>ID: {transaction.id}</p>
					</div>	
					<div className="col-sm p-1">
						<p># Shares: {transaction.num_shares}</p>
						<p>Date: {transaction.created_at}</p>
					</div>
				</div>
			</div>
		));
	};

	// Logic for redirecting to make a trade
	const handleTrade = (event) => {
		event.preventDefault();
		const ticker_input = document.querySelector('#buy-ticker-input').value;
		if (ticker_input) {
			window.location.replace('/confirm_trade/' + ticker_input);
		}
	}
	const getMakeTradeJsx = () => (
		<div className="m-auto bg-white h-50 p-5">
			<form onSubmit={handleTrade}>
				<input type="text" id="buy-ticker-input"/>
				<button className="btn btn-primary">Trade</button>
			</form>
		</div>
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

	const handleMoreHoldings = (e) => {
		e.preventDefault();
		setPagination({
			...pagination,
			holdings_index: Math.min(pagination.holdings_index + pagination.max_results, holdings.holdings.length - pagination.max_results + 1),
		});
	};

	const handleFewerHoldings = (e) => {
		e.preventDefault();
		setPagination({
			...pagination,
			holdings_index: Math.max(0, pagination.holdings_index - pagination.max_results)
		});
	};

	const handleMoreTransactions = (e) => {
		e.preventDefault();
		setPagination({
			...pagination,
			transactions_index: Math.min(pagination.transactions_index + pagination.max_results, transactions_data.length - pagination.max_results + 1),
		})
	};

	const handleFewerTransactions = (e) => {
		e.preventDefault();
		setPagination({
			...pagination,
			transactions_index: Math.max(0, pagination.transactions_index - pagination.max_results)
		});
	};

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
					<p className="h5">Your account value is ${parseFloat(total_value).toFixed(2)}.</p>
					<p className="h5">You currently have ${parseFloat(balance).toFixed(2)} spending power.</p>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<p className="h3">Holdings:</p>
					{getHoldingsJsx(holdings.holdings, pagination.holdings_index)}
					<div className="container bg-dark text-light mt-0">
						<div className="row p-2 m-auto">
							<div className="col-sm">
								<button className="btn btn-secondary" onClick={handleMoreHoldings}>More holdings</button>				
							</div>
							<div className="col-sm">
								<button className="btn btn-secondary" onClick={handleFewerHoldings}>Fewer holdings</button>
							</div>
						</div>	
					</div>
				</div>
				<div className="col-sm">
					<p className="h3">Recent Transactions:</p>
					{getTransactionsJsx(transactions_data, pagination.transactions_index)}
					<div className="container bg-dark text-light mt-0">
						<div className="row p-2 m-auto">
							<div className="col-sm">
								<button className="btn btn-secondary" onClick={handleMoreTransactions}>More transactions</button>				
							</div>
							<div className="col-sm">
								<button className="btn btn-secondary" onClick={handleFewerTransactions}>Fewer transactions</button>
							</div>
						</div>	
					</div>
					
				</div>
			</div>
			<div className="row m-auto">
				<div className="col-sm bg-white p-5 mt-5 mb-5 border">
					<p className="h3">Check Charts:</p>
					<InteractiveChart />
				</div>
				<div className="col-sm bg-white p-5 mt-5 mb-5 border">
					<p className="h3">Make Trade:</p>
					{getMakeTradeJsx()}
					<p className="h3">Check Current Price:</p>
					<PriceInformation />
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