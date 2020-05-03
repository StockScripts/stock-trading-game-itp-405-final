@extends('layouts.app')

@section('page_title')
	New Discussion
@endsection
@section('content')
	<div class="container m-auto bg-white p-5">
		<p class="h3">New Discussion</p>
		<form action="/discussions" method="post">
			@csrf
			<label for="discussion_title" class="p-2">Discussion Title: </label>
			<input type="text" class="w-25" id="discussion_title" name="discussion_title" value="{{old('discussion_title')}}"/>
			<br/>
			@error('discussion_title')
	            <span class="invalid-feedback" role="alert">
	                <strong>{{ $message }}</strong>
	            </span>
	        @enderror
			<label for="type" class="p-2">Type:</label>
			<select name="discussion_type" id="discussion_type" value="stocks">
				<option value="stocks">Stocks</option>
				<option value="random">Random</option>
			</select>
			@error('discussion_type')
	            <span class="invalid-feedback" role="alert">
	                <strong>{{ $message }}</strong>
	            </span>
	        @enderror
			<br/>
			<button class="btn btn-primary m-1">New Discussion</button>
		</form>
	</div>
@endsection
