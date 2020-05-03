@extends('layouts.app')
@section('page_title')
	Confirm Trade
@endsection
@section('content')
<input type="hidden" id="ticker-value" value="{{$ticker}}">
<div class="container w-50 p-5 pb-2 m-auto text-center bg-white">
	<div class="col-md text-center float-right m-2">
		<p class="h3 p-2">Confirm Trade:</p>
		<form action="/confirm_trade" method="post">
			@csrf
			<label for="ticker" class="p-2">Ticker: </label>
			<input type="text" class="w-25" pattern="^[A-Za-z -]+$" id="update-ticker" name="ticker" value="{{old('ticker', $ticker)}}"/>
			<br/>
			<label for="numShares" class="p-2"># Shares:</label>
			<input type="number" class="w-25" pattern="^[A-Za-z -]+$" id="update-num-shares" name="numShares" value="{{ old('numShares', 1) }}"/>
			<br/>
			<label for="type" class="p-2">Action:</label>
			<select name="type" id="type" value="buy">
			<option value="buy">Buy</option>
			<option value="sell">Sell</option>
			</select>
			<br/>
			<button class="btn btn-primary m-1">Submit Trade</button>
		</form>
	</div>
</div>
<div id="confirm-content"></div>
<script src="{{ asset('js/ConfirmTrade.js') }}"></script>
@endsection
