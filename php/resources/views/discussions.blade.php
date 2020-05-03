@extends('layouts.app')
<?php
$discussions_encoded = json_encode($discussions->toArray());
?>
@section('page_title')
	Discussions
@endsection
@section('content')
	<input type="hidden" value="{{$discussions_encoded}}" id="discussions-encoded"/>
	<div id="discussions-content"></div>
	<script src="{{ asset('js/Discussions.js') }}"></script>
@endsection
