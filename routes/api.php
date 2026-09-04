<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiCityController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Endpoint untuk Peta (Detail Kota by ID)
Route::get('/cities/{id}', [ApiCityController::class, 'show']);

// Endpoint untuk Grafik (Top UMR dan Top Waktu Tempuh)
Route::get('/chart-data', [ApiCityController::class, 'chartData']);
