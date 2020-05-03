@extends('layouts.app')
<?php
$transactions_encoded = json_encode($transactions->toArray());
$holdings_encoded = json_encode($holdings->toArray());
?>

@section('page_title')
	Dashboard
@endsection
@section('content')
<input type="hidden" id="transactions-values" value="{{$transactions_encoded}}">
<input type="hidden" id="holdings-values" value="{{$holdings_encoded}}">
<input type="hidden" id="balance-value" value="{{$balance->balance}}">
<input type="hidden" id="username-value" value="{{$user->username}}">
<div class="container">
    <div id="home-content"></div>
    <script src="{{ asset('js/Home.js') }}"></script>
</div>
@endsection
