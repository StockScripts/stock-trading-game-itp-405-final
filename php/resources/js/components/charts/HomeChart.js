import React, { PureComponent, useState, Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {getHistoricalPrices} from '../fetch/fetchStockPrices';

function HomeChart(props){
	
	const [loading, setLoading] = useState({
		data: null,
		min: 0,
		max: 0
	});

	const getReturnJsx = (inp) => (
		<Fragment>
			<p class="m-auto text-center">
				Ticker: {props.ticker.toUpperCase()}
			</p>
			<LineChart
		        width={500}
		        height={300}
		        data={inp.data}
		    >
		        <CartesianGrid strokeDasharray="3 3" />
		        <XAxis dataKey="name" tick={false}/>
		        <YAxis domain={[inp.min, inp.max]}/>
		        <Tooltip />
		        <Legend />
		        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
		    </LineChart>
		    <style jsx>{`
				.recharts-wrapper {
					margin: auto;
				}
			`}</style>
	    </Fragment> 
	);

	useEffect(() => {
		const fetchData = async () => {
			getHistoricalPrices(props.ticker)
			.then(res => {
				const res_keys = Object.keys(res);
				let min = Number.MAX_SAFE_INTEGER;
				let max = Number.MIN_SAFE_INTEGER;
				let data = res_keys.map(key => {
					const price = res[key]['1. open'];
					min = Math.min(price, min);
					max = Math.max(price, max);
					return {
						name: key,
						value: price
					};
				});
				data = data.reverse();
				setLoading({
					data: data,
					min: (min > 0 ? Math.max(min-50, 0) : min),
					max: max+50
				});
			})
			.catch(err => {
				console.log(err);
			});
		};
		fetchData();
	}, [props.ticker]);
	
	let message;
	message = <p>loading...</p>;
	if (loading.data) {
		message = getReturnJsx(loading);
	}

	return (
		<Fragment>
			{message}
		</Fragment>
	);
}

export default HomeChart;