<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anime;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class AnimeController extends Controller
{
    public function index() {
        $user = Auth::user();
        $user_anime = Anime::where('user_id', $user->id)->get();
        return Inertia::render('Anime/Anime', ['animeList' => $user_anime]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'season' => 'required|integer|min:1',
            'episode' => 'required|integer|min:0',
            'genre' => 'string|nullable|max:255',
            'publisher' => 'string|nullable|max:255',
            'translator' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $anime = Anime::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'season' => $request->season,
            'episode' => $request->episode,
            'genre' => $request->genre,
            'publisher' => $request->publisher,
            'translator' => $request->translator,
            'comment' => $request->comment,
            'status_id' => $request->status_id,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Anime',
            'model_id' => $anime->id,
            'data' => $anime->title,
        ]);

        return Inertia::render('Anime/Anime', ['anime' => $anime, 'action' => 'create']);
    }

    public function destroy(Request $request)
    {
        Anime::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Anime',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('anime.index');
    }
}
