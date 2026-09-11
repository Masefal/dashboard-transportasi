<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Admin\CityController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\City;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'cities' => City::all() 
    ]);
});

Route::get('/dashboard', [CityController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/cities', [CityController::class, 'store'])->name('cities.store');
    Route::post('/cities/import', [CityController::class, 'import'])->name('cities.import');
    Route::put('/cities/{city}', [CityController::class, 'update'])->name('cities.update');
    Route::delete('/cities/{city}', [CityController::class, 'destroy'])->name('cities.destroy');
});

require __DIR__.'/auth.php';