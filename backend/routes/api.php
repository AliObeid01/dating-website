<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\landingController;

Route::group(["prefix"=> "v1"], function(){


    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get("/not_found", [LandingController::class, "notFound"])->name("not-found");
    
});