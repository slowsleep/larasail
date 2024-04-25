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
            'part' => 'integer|nullable|min:1',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $movie = Movie::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'part' => $request->part,
            'comment' => $request->comment,
            'finished' => $request->finished,
            'abandoned' => $request->abandoned,
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

    public function update(Request $request): Response
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'part' => 'integer|nullable|min:1',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $movie = Movie::findOrFail($request->id);
        $movie->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Movie',
            'model_id' => $movie->id,
            'data' => $movie->title,
        ]);

        return Inertia::render('Movie/Movies', ['movie' => $movie, 'action' => 'update']);
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

        return Redirect::route('movies');
    }
}
