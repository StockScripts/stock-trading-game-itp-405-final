@extends('layouts.app')
@section('page_title')
	Stock Trading Game
@endsection
@section('content')
	<div id="intro" class="container text-center m-auto w-50">
		<p class="text-center m-auto h3">
			Welcome to a stock trading simulator!
		</p>
		<p class="text-left mt-1">
			Want to learn more about trading stocks? <a href="{{route('register')}}">Register</a> for an account to start trading risk-free today with fake money...
		</p>
		<p class="text-left">
			Already have an account? <a href="{{route('login')}}">Login here.</a>
		</p>
	</div>
	<div id="chart" class="m-auto text-center"></div>
	<script src="{{ asset('js/Example.js') }}"></script>
@endsection
