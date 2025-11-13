<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Game;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class GameController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'genre' => 'string|nullable|max:255',
                'developer' => 'string|nullable|max:255',
                'publisher' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

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
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
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

    public function search(Request $request)
    {
        try {
            $query = Game::query();

            if ($request->filled('title')) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }

            if ($request->filled('genre')) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            if ($request->filled('developer')) {
                $developer = $request->input('developer');
                $query->where('developer', 'like', '%' . $developer . '%');
            }

            if ($request->filled('publisher')) {
                $publisher = $request->input('publisher');
                $query->where('publisher', 'like', '%' . $publisher . '%');
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $games = $query->get();

            return response()->json(['error' => false, 'data' => $games]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
