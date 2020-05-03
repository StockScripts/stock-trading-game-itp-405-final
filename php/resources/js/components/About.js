import React, {useEffect, useState, Fragment} from 'react';
import ReactDOM from 'react-dom';
import AboutModal from './modal/AboutModal';

function About() {

	const projectRequirements = [
		{
			requirement: 'At least 4 GET routes',
			demonstrated_by:
				<div className="container">
					<div className="h4 text-center">
						<p>At least 4 GET routes</p>
					</div>
					<div className="row">
						<div className="col-sm">
							<p className="text-center h4">
								Laravel
							</p>
							<ul>
								<li>/home</li>
								<li>/confirm_trade/:ticker</li>
								<li>/discussions</li>
								<li>/discussions/new/:discussion_id</li>
								<li>/discussions/new_comment/:discussion_id</li>
							</ul>	
						</div>
						<div className="col-sm">
							<p className="text-center h4">
								Express	
							</p>
							<ul>
								<li>/latest_price</li>
								<li>/latest_information</li>
								<li>/historical_information</li>
							</ul>
						</div>
					</div>
					<p className="h5">8 GET routes in total</p>
					<p>*Note that I did not include auth here</p>
				</div>
		},
		{
			requirement: 'Create an about page at /about that explains the goal/mission of the site. Be sure to add this link to your main navigation.',
			demonstrated_by:
				<div className="container">
					<div className="h4 text-center m-auto">
						Create an about page at /about that explains the goal/mission of the site. Be sure to add this link to your main navigation.
					</div>
					<p className="mt-2">
						This page serves as the about page. The navbar has a /about route.
					</p>	
				</div>
		},
		{
			requirement: 'At least 3 POST routes',
			demonstrated_by:
				<div className="container">
					<div className="h4 text-center m-auto">
						At least 3 POST routes
					</div>
					<div className="row m-auto">
						<p className="h4">Laravel:</p>
						<ul>
							<li>/confirm_trade (Note this handles both buying and selling stocks)</li>
							<li>/discussions</li>
							<li>/discussions/comments</li>
						</ul>
					</div>
					<p>*Note that I did not include auth here</p>
				</div>
		},
		{
			requirement: 'Pages where users can create, edit, and delete data.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4">Pages where users can create, edit, and delete data.</p>
					<div className="row mt-3">
						<div className="col-sm">
							<p className="h5 text-center">Create:</p>
							<p>
								Users can create new discussions on the new discussions page, can create comments on the new comments page, and can create transactions (and possibly holdings) on the trading page. Also,
								user balance records are created immediately following user sign-up, as defined in the User model.
							</p>
						</div>
						<div className="col-sm">
							<p className="h5 text-center">Update:</p>
							<p>
								Users can update data on the trading page. If the user already owns a stock, that record in the holdings table will be updated. Furthermore, their balance will be updated as well. 
							</p>
						</div>
					</div>	
					<div className="row">
						<div className="col-sm"></div>
						<div className="col-sm-6">
							<p className="h5 text-center">Delete:</p>
							<p>
								Users can delete data on the trading page. If they sell all of a particular stock, that record will be deleted from the holdings table. Of course, the transaction will be recorded
								in the transactions table so there is still a record of this operation.
							</p>	
						</div>
						<div className="col-sm"></div>
					</div>
				</div>
		},
		{
			requirement: 'Server-side validation with Laravel’s validation rules',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4">Server-side validation with Laravel’s validation rules</p>
					<p className="mt-3">
						All post requests are handled through laravel's forms. In the controller, all the requests are validated.
					</p>
					<p>Transactions Controller (post to /confirm_trade)</p>
					<code>
						$request->validate([
				            'ticker' => 'string',
				            'numShares' => 'numeric',
				        ]);
					</code>
					<p>Discussions Controller (post to /discussions)</p>
					<code>
						$request->validate([
				            'discussion_title' => 'string',
				            'discussion_type' => 'string',
				        ]);
					</code>
					<p>Discussions Controller (post to /discussions/comments)</p>
					<code>
						$request->validate([
				            'discussion_id' => 'exists:discussions,id',
				            'comment' => 'string',
				        ]);
					</code>
				</div>
		},
		{
			requirement: 'Error messages as flashed session data for when form submissions fail validation.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4">Error messages as flashed session data for when form submissions fail validation. Your error messages should be specific to the fields that failed validation as opposed to showing a single generic error message on the page.</p>
					<p className="mt-2">
						In the app layout blade template, I have both success and error divs. From the controllers, I either pass success or error on operations that are submitted.
					</p>
					<p className="h5">Examples:</p>
					<p>Error with API (Alpha Vantage seems to have weird quirks with certain tickers)</p>
					<code className="mb-2">
						return back()
                			->with('error', 'There was an error with your transaction. This is likely an API issue loading the ticker provided.');
					</code>
					<p>Successful purchase of stock:</p>
					<code>
						return redirect('home')
            				->with('success', 'Transaction completed successfully. Purchased ' . $request->input('numShares') . ' of ' . $request->input('ticker') . '.');
					</code>
				</div>
		},
		{
			requirement: 'Form submissions that fail validation should repopulate the form with the user’s input',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4">Form submissions that fail validation should repopulate the form with the user’s input</p>
					
				</div>
		}
	];
	return (
		<div className="container m-auto bg-white p-5">
			<p className="h3 text-center p-2">About</p>
			<div className="row">
				<div className="col-sm">
					<p className="h4 text-center">Inspiration for the project:</p>
					<ul>
						<li>Wanted to pull real-time data in from outside source</li>
						<li>Wanted to create an interactive game for users</li>
						<li>Slight interest in finance</li>
					</ul>
				</div>
				<div className="col-sm">
					<p className="h4 text-center">Technology Used:</p>
					<ul className="text-left">
						<li>Express / NodeJS</li>
						<li>Laravel</li>
						<li>SQLite</li>
						<li>React</li>
					</ul>
				</div>
			</div>
			<div className="row m-auto">
				<p className="h4 text-center">
					Project Requirements
				</p>
				{projectRequirements.map(requirement => (
					<Fragment>
						{AboutModal(requirement)}
					</Fragment>
				))}
			</div>
		</div>
	);
}

if (document.getElementById('about-content')) {
    ReactDOM.render(<About />, document.getElementById('about-content'));
}