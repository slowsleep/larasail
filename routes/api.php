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
    Route::get('/anime/search', [App\Http\Controllers\Api\AnimeController::class, 'search'])->name('api.anime.search');

    Route::patch('/movies', [App\Http\Controllers\Api\MovieController::class, 'update'])->name('api.movies.update');
    Route::get('/movies/sort', [App\Http\Controllers\Api\MovieController::class, 'sort'])->name('api.movies.sort');
    Route::get('/movies/search', [App\Http\Controllers\Api\MovieController::class, 'search'])->name('api.movies.search');

    Route::patch('/series', [App\Http\Controllers\Api\SeriesController::class, 'update'])->name('api.series.update');
    Route::get('/series/sort', [App\Http\Controllers\Api\SeriesController::class, 'sort'])->name('api.series.sort');
    Route::get('/series/search', [App\Http\Controllers\Api\SeriesController::class, 'search'])->name('api.series.search');

    Route::patch('/mangas', [App\Http\Controllers\Api\MangaController::class, 'update'])->name('api.mangas.update');
    Route::get('/mangas/sort', [App\Http\Controllers\Api\MangaController::class, 'sort'])->name('api.mangas.sort');
    Route::get('/mangas/search', [App\Http\Controllers\Api\MangaController::class, 'search'])->name('api.mangas.search');

    Route::patch('/games', [App\Http\Controllers\Api\GameController::class, 'update'])->name('api.games.update');
    Route::get('/games/sort', [App\Http\Controllers\Api\GameController::class, 'sort'])->name('api.games.sort');
    Route::get('/games/search', [App\Http\Controllers\Api\GameController::class, 'search'])->name('api.games.search');

    Route::patch('/books', [App\Http\Controllers\Api\BookController::class, 'update'])->name('api.books.update');
    Route::get('/books/sort', [App\Http\Controllers\Api\BookController::class, 'sort'])->name('api.books.sort');
    Route::get('/books/search', [App\Http\Controllers\Api\BookController::class, 'search'])->name('api.books.search');

    Route::patch('/cartoons', [App\Http\Controllers\Api\CartoonController::class, 'update'])->name('api.cartoons.update');
    Route::get('/cartoons/sort', [App\Http\Controllers\Api\CartoonController::class, 'sort'])->name('api.cartoons.sort');
    Route::get('/cartoons/search', [App\Http\Controllers\Api\CartoonController::class, 'search'])->name('api.cartoons.search');

    Route::patch('/animated-series', [App\Http\Controllers\Api\AnimatedSeriesController::class, 'update'])->name('api.animated-series.update');
    Route::get('/animated-series/sort', [App\Http\Controllers\Api\AnimatedSeriesController::class, 'sort'])->name('api.animated-series.sort');
    Route::get('/animated-series/search', [App\Http\Controllers\Api\AnimatedSeriesController::class, 'search'])->name('api.animated-series.search');
});

Route::middleware('auth:sanctum')->get('/keep-alive', function (Request $request) {
    Session::put('last_activity', now()); // Обновление сессии
    return response()->json(['status' => 'ok']);
});
