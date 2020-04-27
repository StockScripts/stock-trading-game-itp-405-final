@extends('layouts.app')
@section('content')
<input type="hidden" id="ticker-value" value="{{$ticker}}">
<div class="container">
	<div id="confirm-content"></div>
	<script src="{{ asset('js/ConfirmTrade.js') }}"></script>
</div>
@endsection
