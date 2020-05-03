<?php

namespace App\Http\Controllers;

use App\Api\StocksApi;
use Auth;
use DB;
use Exception;
use Illuminate\Http\Request;

class TransactionsController extends Controller
{
    protected $_availableActions = [
        'buy',
        'sell',
    ];

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function renderConfirmTrade($ticker)
    {
        return view('confirm_trade', [
            'ticker' => $ticker,
        ]);
    }

    public function trade(Request $request)
    {
        $request->validate([
            'ticker' => 'string',
            'numShares' => 'numeric',
        ]);
        $type = $request->input('type');
        if ($type === 'buy') {
            return $this->_buy($request);
        } elseif ($type === 'sell') {
            return $this->_sell($request);
        }
    }

    protected function _buy(Request $request)
    {
        $user = Auth::user();
        $user_balance = DB::table('balances')
            ->where('user_id', '=', $user->id)
            ->first();
        $StocksApi = new StocksApi();
        try {
            $stock_price = $StocksApi->getCurrentPrice($request->input('ticker'));
        } catch (Exception $e) {
            return back()
                ->with('error', 'There was an error with your transaction. This is likely an API issue with the ticker provided.');
        }
        if (!$stock_price) {
            return back()
                ->with('error', 'Error with Stocks API');
        }
        $total_transaction_cost = $request->input('numShares') * $stock_price;
        if ($total_transaction_cost > $user_balance->balance) {
            return back()
                ->with('error', 'You do not have enough balance to perform transaction');
        }
        $new_user_balance = $user_balance->balance - $total_transaction_cost;
        DB::table('transactions')->insert([
            'user_id' => $user->id,
            'type' => 'buy',
            'ticker' => $request->input('ticker'),
            'num_shares' => $request->input('numShares'),
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        $current_transaction = DB::table('transactions')
            ->where('user_id', '=', $user->id)
            ->where('type', '=', 'buy')
            ->where('ticker', '=', $request->input('ticker'))
            ->where('num_shares', '=', $request->input('numShares'))
            ->latest()
            ->first();
        $current_holding = DB::table('holdings')
            ->where('user_id', '=', $user->id)
            ->where('ticker', '=', $request->input('ticker'))
            ->first();
        if (!$current_holding) {
            DB::table('holdings')->insert([
                'user_id' => $user->id,
                'ticker' => $request->input('ticker'),
                'num_shares' => $request->input('numShares'),
                'transaction_id' => $current_transaction->id,
            ]);
        } else {
            DB::table('holdings')
                ->where('user_id', '=', $user->id)
                ->where('ticker', '=', $request->input('ticker'))
                ->update([
                    'num_shares' => $current_holding->num_shares + $request->input('numShares'),
                    'transaction_id' => $current_transaction->id,
                ]);
        }
        DB::table('balances')
            ->where('user_id', '=', $user->id)
            ->update([
                'balance' => $new_user_balance,
            ]);

        return redirect('home')
            ->with('success', 'Transaction completed successfully. Purchased ' . $request->input('numShares') . ' of ' . $request->input('ticker') . '.');
    }

    protected function _sell(Request $request)
    {
        $user = Auth::user();
        $user_balance = DB::table('balances')
            ->where('user_id', '=', $user->id)
            ->first();
        $StocksApi = new StocksApi();
        $stock_price = $StocksApi->getCurrentPrice($request->input('ticker'));
        $current_holding = DB::table('holdings')
            ->where('user_id', '=', $user->id)
            ->where('ticker', '=', $request->input('ticker'))
            ->first();

        if (!$current_holding) {
            return back()
                ->with('error', 'You do not currently own this stock');
        }
        if ($current_holding->num_shares < $request->input('numShares')) {
            return back()
                ->with('error', 'You do not currently own that many shares of this stock');
        }

        // Calculate new user balance after transaction
        $new_user_balance = ($stock_price * $request->input('numShares')) + $user_balance->balance;

        // Insert transaction
        DB::table('transactions')->insert([
            'user_id' => $user->id,
            'type' => 'sell',
            'ticker' => $request->input('ticker'),
            'num_shares' => $request->input('numShares'),
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        // Remove from holdings
        if ($current_holding->num_shares === $request->input('numShares')) {
            DB::table('holdings')
                ->where('user_id', '=', $user->id)
                ->where('ticker', '=', $request->input('ticker'))
                ->delete();
        }
        // Update holdings
        else {
            DB::table('holdings')
                ->where('user_id', '=', $user->id)
                ->where('ticker', '=', $request->input('ticker'))
                ->update([
                    'num_shares' => $current_holding->num_shares - $request->input('numShares'),
                ]);
        }

        // Update balance
        DB::table('balances')
            ->where('user_id', '=', $user->id)
            ->update([
                'balance' => $new_user_balance,
            ]);

        return redirect('home')
            ->with('success', 'Transaction completed successfully. Sold ' . $request->input('numShares') . ' of ' . $request->input('ticker') . '.');

    }
}
