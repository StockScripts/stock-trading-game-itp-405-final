import React from 'react';
import ReactDOM from 'react-dom';
import HomeChart from './charts/HomeChart.js';

function Example() {
    return (
        <div className="container m-auto text-center">
            {HomeChart({
            	ticker: 'spy'
            })}
        </div>
    );
}

export default Example;

if (document.getElementById('chart')) {
    ReactDOM.render(<Example />, document.getElementById('chart'));
}
