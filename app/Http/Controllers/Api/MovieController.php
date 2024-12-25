<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    public function update(Request $request)
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

        $response = [
            'error' => false,
            'data' => [
                'movie' => $movie,
                'action' => 'update'
            ]
        ];

        return response()->json($response);
        // return Inertia::render('Movie/Movies', ['movie' => $movie, 'action' => 'update']);
    }
}
