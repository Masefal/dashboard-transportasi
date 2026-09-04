<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AdminCityController;

Route::get('/', function () {
    return view('welcome');
});

// Endpoint CRUD untuk Admin
Route::prefix('admin')->group(function () {
    Route::apiResource('cities', AdminCityController::class);
});
