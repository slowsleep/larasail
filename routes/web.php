<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SeriesController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\MangaController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\BuddiesController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChatController;
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
    Route::get('/profile/{name}', [ProfileController::class, 'show'])->name('profile.show');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/profile', [AvatarController::class, 'update'])->name('avatar.update');
    Route::delete('/profile', [AvatarController::class, 'destroy'])->name('avatar.destroy');
    Route::get('/profile/{name}/activity', [ActivityLogController::class, 'get'])->name('profile.activity');

    Route::get('/buddies', [BuddiesController::class, 'index'])->name('buddies');
    Route::get('/buddies/search', [BuddiesController::class, 'search'])->name('buddies.search');
    Route::post('/buddies', [FollowController::class, 'insert'])->name('buddies.follow');
    Route::delete('/buddies', [FollowController::class, 'destroy'])->name('buddies.unfollow');
    Route::get('/buddies/check', [FollowController::class, 'checkStatus'])->name('buddies.check');
    Route::get('/buddies/followed', [BuddiesController::class, 'followed'])->name('buddies.followed');

    Route::resource('chats', ChatController::class)->only(['index', 'show']);
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    Route::resource('movies', MovieController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('series', SeriesController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::get('/games', [GameController::class, 'index'])->name('games');
    Route::post('/games', [GameController::class, 'store'])->name('games.store');
    Route::patch('/games', [GameController::class, 'update'])->name('games.update');
    Route::delete('/games', [GameController::class, 'destroy'])->name('games.destroy');

    Route::get('/books', [BookController::class, 'index'])->name('books');
    Route::post('/books', [BookController::class, 'store'])->name('books.store');
    Route::patch('/books', [BookController::class, 'update'])->name('books.update');
    Route::delete('/books', [BookController::class, 'destroy'])->name('books.destroy');

    Route::get('/mangas', [MangaController::class, 'index'])->name('mangas');
    Route::post('/mangas', [MangaController::class, 'store'])->name('mangas.store');
    Route::patch('/mangas', [MangaController::class, 'update'])->name('mangas.update');
    Route::delete('/mangas', [MangaController::class, 'destroy'])->name('mangas.destroy');
});

require __DIR__.'/auth.php';
