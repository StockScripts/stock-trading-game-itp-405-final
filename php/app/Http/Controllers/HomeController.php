<?php

namespace App\Http\Controllers;

use Auth;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = Auth::user();
        $balance = DB::table('balances')
            ->where('user_id', '=', $user->id)
            ->first();
        $transactions = DB::table('transactions')
            ->where('user_id', '=', $user->id)
            ->orderBy('id', 'desc')
            ->get();
        $holdings = DB::table('holdings')
            ->where('user_id', '=', $user->id)
            ->get();
        return view('home', compact('user', 'balance', 'transactions', 'holdings'));
    }
}
