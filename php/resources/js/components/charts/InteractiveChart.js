import React, {useState, Fragment} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {getHistoricalPrices} from '../fetch/fetchStockPrices';
import HomeChart from './HomeChart.js';

function InteractiveChart() {
	const [ticker, setTicker] = useState('SPY');
	
	const handleSubmit = (event) => {
		event.preventDefault();
		const update_ticker = document.querySelector('#ticker-input').value;
		if (!update_ticker) {
			return;
		}
		setTicker(update_ticker);
	};

	return(
		<div className="m-auto text-center p-2">
			{HomeChart({
				ticker: ticker
			})}
			<form>
				<input type="text" id="ticker-input" placeholder={ticker}/>
				<button className="btn btn-dark" onClick={handleSubmit}>Get Chart</button>
			</form>
		</div>
	);
}

export default InteractiveChart;