<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Movie;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ActivityLogController;

class MovieController extends Controller
{

    public function index(): Response
    {
        $user = Auth::user();
        $user_movies = Movie::where('user_id', $user->id)->get();
        return Inertia::render('Movie/Movies', [
            'movies' => $user_movies,
        ]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'year' => 'integer|nullable|min:1',
            'genre' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $movie = Movie::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'year' => $request->year,
            'genre' => $request->genre,
            'comment' => $request->comment,
            'status_id' => $request->status_id,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Movie',
            'model_id' => $movie->id,
            'data' => $movie->title,
        ]);

        return Inertia::render('Movie/Movies', ['movie' => $movie, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Movie::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Movie',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('movies.index');
    }
}
