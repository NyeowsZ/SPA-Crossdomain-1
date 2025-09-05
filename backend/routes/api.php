<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        'username' => 'required|string|unique:users,username',
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

Route::post('/login', function(Request $request){
    $validator = Validator::make($request->only(['username', 'password']), [
        'username' => 'required|string',
        'password' => 'required|string'
    ]);

    if($validator->fails()){

        return response()->json([
            'message' => 'Invalid Credentials'
        ], 401);
    }

    if(Auth::attempt(['username' => $request->username, 'password' => $request->password])){
        return response()->json([
            "message" => "Sucessfully Logged In"
        ]);
    } else {
        return response()->json([
            "message" => "Invalid Credentials"
        ], 401);
    }
});

Route::get('/auth-check', function() {
    if (Auth::check()) {
        return response()->json(['message' => 'You are authenticated']);
    }
    return response()->json(['message' => 'Not authenticated'], 401);
});
