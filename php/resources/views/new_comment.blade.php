@extends('layouts.app')

@section('page_title')
	New Comment For {{ $discussion->title }}
@endsection

@section('content')
	<div class="container m-auto bg-white p-5">
		<p class="h3 text-center p-2">{{ $discussion->title }}</p>
		<div class="h3 p-2 w-75 m-auto">By:
			<div class="d-inline text-primary">{{ $discussion->username }}</div>
		</div>
		<form action="/discussions/comments" method="post">
			@csrf
			<input type="hidden" name="discussion_id" value="{{$discussion->id}}">
			<textarea name="comment" id="comment" class="form-control w-75 m-auto"></textarea>
			<div class="w-75 m-auto pt-2">
				<button class="btn btn-primary">New Comment</button>
			</div>
			@error('comment')
	            <span class="invalid-feedback" role="alert">
	                <strong>{{ $message }}</strong>
	            </span>
	        @enderror
		</form>
	</div>
@endsection
