<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

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
    Route::get('/anime/sort', [App\Http\Controllers\Api\AnimeController::class, 'sort'])->name('api.anime.sort');

    Route::patch('/movies', [App\Http\Controllers\Api\MovieController::class, 'update'])->name('api.movies.update');
    Route::get('/movies/sort', [App\Http\Controllers\Api\MovieController::class, 'sort'])->name('api.movies.sort');

    Route::patch('/series', [App\Http\Controllers\Api\SeriesController::class, 'update'])->name('api.series.update');
    Route::get('/series/sort', [App\Http\Controllers\Api\SeriesController::class, 'sort'])->name('api.series.sort');

    Route::patch('/mangas', [App\Http\Controllers\Api\MangaController::class, 'update'])->name('api.mangas.update');
    Route::get('/mangas/sort', [App\Http\Controllers\Api\MangaController::class, 'sort'])->name('api.mangas.sort');

    Route::patch('/games', [App\Http\Controllers\Api\GameController::class, 'update'])->name('api.games.update');
    Route::get('/games/sort', [App\Http\Controllers\Api\GameController::class, 'sort'])->name('api.games.sort');

    Route::patch('/books', [App\Http\Controllers\Api\BookController::class, 'update'])->name('api.books.update');
    Route::get('/books/sort', [App\Http\Controllers\Api\BookController::class, 'sort'])->name('api.books.sort');

    Route::patch('/cartoons', [App\Http\Controllers\Api\CartoonController::class, 'update'])->name('api.cartoons.update');
    Route::get('/cartoons/sort', [App\Http\Controllers\Api\CartoonController::class, 'sort'])->name('api.cartoons.sort');
});

Route::middleware('auth:sanctum')->get('/keep-alive', function (Request $request) {
    Session::put('last_activity', now()); // Обновление сессии
    return response()->json(['status' => 'ok']);
});
