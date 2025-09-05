<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/healthcheck', function () {
    return response()->json([
        'message' => 'Successfully Pinged'
    ], 200);
});