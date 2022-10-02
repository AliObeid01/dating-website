<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\landingController;

Route::group(["prefix"=> "v1"], function(){

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/user-profile', [landingController::class, 'userProfile']);
        Route::get('/feed', [landingController::class, 'userFeed']);
        Route::post('/update-profile', [landingController::class, 'updateProfile']);
        Route::post('/favorite-user', [landingController::class, 'favoriteUser']);
        Route::post('/unfavorite-user', [landingController::class, 'UnfavoriteUser']);
        Route::get('/favorites', [landingController::class, 'getfavorites']);
        Route::get('/favoriteby', [landingController::class, 'getFavoriteBy']);
        Route::post('/block-user', [landingController::class, 'blockUser']);
        Route::post('/send-message', [landingController::class, 'sendMessage']);
        Route::get('/user-SendMessages', [landingController::class, 'getSentMessages']);
        Route::get('/user-RecievedMessages', [landingController::class, 'getRecievedMessages']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get("/not_found", [LandingController::class, "notFound"])->name("not-found");

});