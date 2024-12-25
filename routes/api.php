<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth', 'web', 'auth:sanctum']],function () {
    Route::patch('/anime', [App\Http\Controllers\Api\AnimeController::class, 'update'])->name('api.anime.update');
    Route::patch('/movies', [App\Http\Controllers\Api\MovieController::class, 'update'])->name('api.movies.update');
    Route::patch('/series', [App\Http\Controllers\Api\SeriesController::class, 'update'])->name('api.series.update');
    Route::patch('/mangas', [App\Http\Controllers\Api\MangaController::class, 'update'])->name('api.mangas.update');
    Route::patch('/games', [App\Http\Controllers\Api\GameController::class, 'update'])->name('api.games.update');
    Route::patch('/books', [App\Http\Controllers\Api\BookController::class, 'update'])->name('api.books.update');
});
