<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class MangaController extends Controller
{
    use SortableTrait;

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
    }

    public function sort(Request $request)
    {
        try {
            $mangas = $this->sorting($request, Manga::class);
            $response = [
                'error' => false,
                'data' => $mangas,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
