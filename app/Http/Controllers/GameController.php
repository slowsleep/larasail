<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Game;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class GameController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $user_games = Game::where('user_id', $user->id)->get();
        return Inertia::render('Game/Games', ['games' => $user_games]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'genre' => 'string|nullable|max:255',
            'developer' => 'string|nullable|max:255',
            'publisher' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $game = Game::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'genre' => $request->genre,
            'developer' => $request->developer,
            'publisher' => $request->publisher,
            'comment' => $request->comment,
            'finished' => $request->finished,
            'abandoned' => $request->abandoned,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Game',
            'model_id' => $game->id,
            'data' => $game->title,
        ]);

        return Inertia::render('Game/Games', ['game' => $game, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Game::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Game',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('games.index');
    }
}
