<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class MangaController extends Controller
{
    public function update(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'volume' => 'required|integer|min:1',
            'chapter' => 'required|integer|min:1',
            'genre' => 'string|nullable|max:255',
            'creators' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $manga = Manga::findOrFail($request->id);
        $manga->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Manga',
            'model_id' => $manga->id,
            'data' => $manga->title,
        ]);

        $response = [
            'error' => false,
            'data' => [
                'manga' => $manga,
                'action' => 'update'
        ]];

        return response()->json($response);

        // return Inertia::render('Manga/Manga', ['manga' => $manga, 'action' => 'update']);
    }
}
