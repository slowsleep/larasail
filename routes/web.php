<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SeriesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/movies', [MovieController::class, 'index'])->name('movies');
    Route::post('/movies', [MovieController::class, 'store'])->name('movies.store');
    Route::patch('/movies', [MovieController::class, 'update'])->name('movies.update');
    Route::delete('/movies', [MovieController::class, 'destroy'])->name('movies.destroy');

    Route::get('/series', [SeriesController::class, 'index'])->name('series');
    Route::post('/series', [SeriesController::class, 'store'])->name('series.store');
    Route::patch('/series', [SeriesController::class, 'update'])->name('series.update');
    Route::delete('/series', [SeriesController::class, 'destroy'])->name('series.destroy');
});

require __DIR__.'/auth.php';
