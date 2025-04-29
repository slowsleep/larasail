<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Anime;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AnimeController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'season' => 'required|integer|min:1',
                'episode' => 'required|integer|min:0',
                'genre' => 'string|nullable|max:255',
                'publisher' => 'string|nullable|max:255',
                'translator' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

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
                ],
            ];
            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
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
