<?php

use App\Http\Controllers\ {
    ActivityLogController,
    AnimeController,
    ProfileController,
    AvatarController,
    MovieController,
    SeriesController,
    GameController,
    BookController,
    MangaController,
    FollowController,
    BuddiesController,
    MessageController,
    ChatController
};
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

Route::group(['middleware' => ['auth', 'web']],function () {
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

    Route::resource('chats', ChatController::class)->only(['index', 'show', 'destroy']);
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    Route::resource('movies', MovieController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('series', SeriesController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('games', GameController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('books', BookController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('mangas', MangaController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('anime', AnimeController::class)->only(['index', 'store', 'update', 'destroy']);
});

require __DIR__.'/auth.php';
