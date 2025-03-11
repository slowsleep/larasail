<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'part' => 'integer|nullable|min:1',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
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

        $response = [
            'error' => false,
            'data' => [
                'movie' => $movie,
                'action' => 'update'
            ]
        ];

        return response()->json($response);
    }

    public function sort(Request $request)
    {
        try {
            $movies = $this->sorting($request, Movie::class);
            $response = [
                'error' => false,
                'data' => $movies,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
