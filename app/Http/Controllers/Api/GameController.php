<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;


class GameController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
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

        $game = Game::findOrFail($request->id);
        $game->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Game',
            'model_id' => $game->id,
            'data' => $game->title,
        ]);

        $response = [
            'error' => false,
            'data' => [
                'game' => $game,
                'action' => 'update'
            ]
        ];

        return response()->json($response);
    }

    public function sort(Request $request)
    {
        try {
            $games = $this->sorting($request, Game::class);
            $response = [
                'error' => false,
                'data' => $games,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
