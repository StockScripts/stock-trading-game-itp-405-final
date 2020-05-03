import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Discussion from './util/Discussion.js';

function Discussions() {
	const discussions = JSON.parse(document.querySelector('#discussions-encoded').value);
	return (
		<div className="container bg-white">
			<div className="row text-center pt-3">
				<div className="col-sm">
					<p className="h5">Discussions:</p>	
				</div>	
			</div>
			<div className="row text-left p-2">
				<div className="col-sm">
					<a href="/discussions/new">New Discussion</a>	
				</div>	
			</div>
			<table className="table">
				<thead>
					<tr className="p-2">
						<th>
							Author:
						</th>
						<th>
							Title:
						</th>
					</tr>
				</thead>
				<tbody>
					{discussions.map(discussion => (
						<Fragment>
							{Discussion(discussion)}
						</Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
}

if (document.getElementById('discussions-content')) {
    ReactDOM.render(<Discussions />, document.getElementById('discussions-content'));
}