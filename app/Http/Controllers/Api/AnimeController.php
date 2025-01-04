<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Anime;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class AnimeController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'season' => 'required|integer|min:1',
            'episode' => 'required|integer|min:1',
            'genre' => 'string|nullable|max:255',
            'publisher' => 'string|nullable|max:255',
            'translator' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $anime = Anime::findOrFail($request->id);
        $anime->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Anime',
            'model_id' => $anime->id,
            'data' => $anime->title,
        ]);

        $response = [
            'error' => false,
            'data' => [
                'anime' => $anime,
                'action' => 'update'
            ]
        ];
        return response()->json($response, 200);
    }

    public function sort(Request $request)
    {
        try {
            $anime = $this->sorting($request, Anime::class);
            $response = [
                'error' => false,
                'data' => $anime,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
