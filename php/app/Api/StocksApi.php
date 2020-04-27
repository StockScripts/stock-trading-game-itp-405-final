<?php

namespace App\Api;

use Illuminate\Support\Facades\Http;

class StocksApi
{
    /**
     * gets current price of stock
     * @param  string $ticker stock's ticker on market
     * @return double | false current trading price of stock or false on error
     */
    public function getCurrentPrice($ticker)
    {
        if (!$ticker) {
            return false;
        }
        $uri = env('STOCKS_API');
        $uri .= 'latest_price' . '?ticker=' . $ticker;
        $response = Http::get($uri);
        if (!$response->status() === 200) {
            return false;
        }
        $body = json_decode($response->body());
        return $body->{'1. open'};
    }

    /**
     * gets current information of stock
     * @param  string $ticker stock's ticker on market
     * @return double | false current trading price of stock or false on error
     */
    public function getCurrentInformation($ticker)
    {
        if (!$ticker) {
            return false;
        }
        $uri = env('STOCKS_API');
        $uri .= 'latest_information' . '?ticker=' . $ticker;
        $response = Http::get($uri);
        if (!$response->status() === 200) {
            return false;
        }
        $body = json_decode($response->body());
        return json_decode(json_encode($body), true);
    }

    public function getHistoricalInformation($ticker)
    {

    }
}
