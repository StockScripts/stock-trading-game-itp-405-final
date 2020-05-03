<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::get('/', function () {
    return view('index');
});

//Route::get('/logout', 'Auth\LogoutController')->name('logout');

// Authentication Routes...
Route::get('login', [
    'as' => 'login',
    'uses' => 'Auth\LoginController@showLoginForm',
]);
Route::post('login', [
    'as' => '',
    'uses' => 'Auth\LoginController@login',
]);
Route::get('logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout',
]);
Route::post('logout', [
    'as' => 'logout',
    'uses' => 'Auth\LoginController@logout',
]);

// Registration Routes...
Route::get('register', [
    'as' => 'register',
    'uses' => 'Auth\RegisterController@showRegistrationForm',
]);
Route::post('register', [
    'as' => '',
    'uses' => 'Auth\RegisterController@register',
]);

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/about', function () {
    return view('about');
});

Route::get('/confirm_trade/{ticker}', 'TransactionsController@renderConfirmTrade');

Route::post('/confirm_trade', 'TransactionsController@trade');

Route::get('/discussions', 'DiscussionsController@renderDiscussions')->name('discussions');

Route::get('/discussions/new', 'DiscussionsController@renderNewDiscussion');

Route::post('/discussions', 'DiscussionsController@postDiscussion');

Route::get('/discussions/new_comment/{discussion_id}', 'DiscussionsController@renderNewComment');

Route::post('/discussions/comments', 'DiscussionsController@postComment');
