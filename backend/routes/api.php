<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/healthcheck', function () {
    return response()->json([
        'message' => 'Successfully Pinged'
    ], 200);
});

Route::post('/loopback', function(Request $request){
    return response()->json([
        'message' => "Message Received: " . $request->message
    ]);
});

Route::post('/register', function(Request $request) {
    $validator = Validator::make($request->only(['username', 'password']), [
        'username' => 'required|string',
        'password' => 'required|string|min:8'
    ]);

    if($validator->fails()){

        return response()->json([
            'message' => 'Incorrect Format'
        ], 401);
    }

    User::create([
        'username' => $request->username,
        'password' => $request->password
    ]);

    return response()->json([
        'message' => 'Sucessfully Registered'
    ]);
});