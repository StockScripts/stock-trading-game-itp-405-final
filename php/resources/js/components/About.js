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
						My app has specific validation beyond just the laravel validators, specifically making sure the ticker gets a valid response from the stocks API. When there is an error, I pass back a message.
					</p>
					<p className="h5">Examples:</p>
					<p>Error with API (Alpha Vantage seems to have weird quirks with certain tickers)</p>
					<code className="mb-2">
						return back()
                			->with('error', 'There was an error with your transaction. This is likely an API issue loading the ticker provided.');
					</code>
				</div>
		},
		{
			requirement: 'Form submissions that fail validation should repopulate the form with the user’s input',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4">Form submissions that fail validation should repopulate the form with the user’s input</p>
					<p className="mt-2 mb-1">All forms take advantage of this within the app.</p>
					<p className="m-0">Example of call to <code>old()</code></p>
					<code>
						old('numShares', 1)
					</code>
				</div>
		},
		{
			requirement: 'Flashed session data for when inserts, updates, and deletions are successful',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Flashed session data for when inserts, updates, and deletions are successful</p>
					<p>This happens when the user issues a new comment or new discussion, or when the user performs a transaction.</p>
					<p className="h5">Examples:</p>
					<p>Transaction:</p>
					<code>
						return redirect('home')
            				->with('success', 'Transaction completed successfully. Purchased ' . $request->input('numShares') . ' of ' . $request->input('ticker') . '.');
					</code>
					<p>New Discussion:</p>
					<code>
						return redirect('discussions')
            				->with('success', 'Successfully added new discussion.');
					</code>
				</div>
		},
		{
			requirement: 'Authentication - Sign up, Login, and Logout',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Authentication - Sign up, Login, and Logout</p>
					<p className="mt-2">
						This is all handled with Laravel's built in Auth. However, I had to add an observer to the User model to add a new balances entry upon sign up.
					</p>
				</div>
		},
		{
			requirement: 'Blade templating with a layout that is used for all of your pages.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Blade templating with a layout that is used for all of your pages.</p>
					<p>
						Every page is loaded with the default app layout. The Navbar changes if the user is authenticated.
					</p>
				</div>
		},
		{
			requirement: 'The document title (the title tag) for each page should be unique and contain meaningful data.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">The document title (the title tag) for each page should be unique and contain meaningful data. This includes pages with different data. For example, on Amazon, the document title of a product page is different for every product listed.</p>
					<p>
						There is a unique document title on all pages. The new comment shows the discussion title in the doc title, and all other pages are dynamic and show multiple things. Thus, they have general titles.
					</p>
				</div>
		},
		{
			requirement: 'All queries should go through Eloquent or the Query Builder for database access',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">All queries should go through Eloquent or the Query Builder for database access</p>
					<p className="mt-2">
						All DB access is handled through the query builder, with the exception of new users. This is handled through Laravel's Auth/User model. The User observer uses query builder as well.
					</p>	
				</div>
		},
		{
			requirement: 'Your site should look organized and have a consistent layout. Feel free to use Bootstrap if you’d like.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Your site should look organized and have a consistent layout. Feel free to use Bootstrap if you’d like.</p>
					<p className="mt-2">
						The site uses Bootstrap and reusable React hooks/functions to provide a clean layout.
					</p>
				</div>
		},
		{
			requirement: 'Build a commenting system from scratch for some resource in your application.',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Build a commenting system from scratch for some resource in your application. The comments in your commenting system should at the very least contain the commenter’s name, a comment body, and a time stamp. Comments should be displayed from the most recent to the oldest. Comments don’t need to be commentable.</p>
					<p className="mt-2">
						The discussions and discussion comments demonstrate this functionality.
					</p>
				</div>,
			button_styling: "btn btn-outline-success btn-block"
		},
		{
			requirement: 'Add real-time features to your Laravel project via a Web Socket service built in Node',
			demonstrated_by:
				<div className="container">
					<p className="text-center m-auto h4 p-2">Add real-time features to your Laravel project via a Web Socket service built in Node</p>
					<p className="mt-2">
						I misread this initially and created an Express API for fetching stock data. It turned out to be a nice separation of concerns though, as I could call this API on the frontend and the backend of the laravel app.
					</p>
				</div>,
			button_styling: "btn btn-outline-danger btn-block"
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