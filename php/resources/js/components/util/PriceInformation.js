import React, {useEffect, useState, Fragment} from 'react';
import {getRecentPrices} from '../fetch/fetchStockPrices';
import PriceInformationModal from '../modal/PriceInformationModal';

export default function PriceInformation(props) {
	const [stockInformation, setStockInformation] = useState({
		ticker: '',
		curr_price_info: null
	});

	useEffect(() => {
		if (stockInformation.ticker === '') {
			return;
		}
		const fetchData = async () => {
			const price_info = await getRecentPrices(stockInformation.ticker);
			setStockInformation({
				...stockInformation,
				curr_price_info: price_info
			});
		};
		
		fetchData();
	}, [stockInformation.ticker]);

	const handleStockUpdate = (e) => {
		e.preventDefault();
		setStockInformation({
			...stockInformation,
			ticker: document.querySelector('#stock-info-function-ticker').value
		});
	};

	const getStockInfoJsx = (ticker, data) => {
		const return_jsx = [
			<Fragment>
				<p className="h5">Ticker: {ticker !== '' ? ticker : 'No ticker entered'}</p>
			</Fragment>
		];
		if (!data) {
			return return_jsx.concat([
				<div className="m-auto text-center">
					<p className="h5">waiting...</p>
				</div>
			]);
		}
		const curr_key = Object.keys(stockInformation.curr_price_info)[0];
		return return_jsx.concat([
			<div>
				<p className="text-primary">Date: {curr_key}</p>
				<div className="container text-center text-secondary m-auto">
					<div className="row m-auto text-center">
						<div className="col-sm m-auto">
							Open: {stockInformation.curr_price_info[curr_key]['1. open']}
						</div>
						<div className="col-sm m-auto">
							Volume: {stockInformation.curr_price_info[curr_key]['5. volume']}	
						</div>
					</div>
					<div className="row m-auto text-center">
						<div className="col-sm m-auto">
							Low: {stockInformation.curr_price_info[curr_key]['3. low']}
						</div>
						<div className="col-sm m-auto">
							High: {stockInformation.curr_price_info[curr_key]['2. high']}
						</div>
					</div>
				</div>
			</div>
		]);
	};

	return (
		<div className="h-100">
			<form onSubmit={handleStockUpdate}>
				<input type="text" id="stock-info-function-ticker"/>
				<button className="btn btn-primary">Get Info</button>
			</form>
			<div>
				{getStockInfoJsx(stockInformation.ticker, stockInformation.curr_price_info)}
				{PriceInformationModal({
					buttonText: 'View more price information',
					data: stockInformation.curr_price_info,
					ticker: stockInformation.ticker
				})}
			</div>
		</div>
	);
}