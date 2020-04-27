<?php

namespace App\Http\Controllers;

use Auth;
use DB;
use Hash;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{

    public function showRegistrationForm(Request $request)
    {
        return view('authentication.register');
    }

    // Switch to using query builder
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'min:5|max:30|unique:users,username',
            'password' => 'min:5',
        ]);
        DB::table('users')->insert([
            'username' => $request->input('name'),
            'password' => Hash::make($request->input('password')),
        ]);
        $user = DB::table('users')
            ->where('username', '=', $request->input('name'))
            ->first();
        DB::table('balances')->insert([
            'balance' => 100000,
            'user_id' => $user->id,
        ]);
        Auth::attempt([
            'username' => $request->input('name'),
            'password' => $request->input('password'),
        ]);
        return redirect()->route('home');
    }
}
