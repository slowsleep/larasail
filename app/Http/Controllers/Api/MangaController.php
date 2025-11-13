<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Manga;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MangaController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'volume' => 'required|integer|min:1',
                'chapter' => 'required|integer|min:0',
                'genre' => 'string|nullable|max:255',
                'creators' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

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

    public function search(Request $request)
    {
        try {
            $query = Manga::query();

            if ($request->has('title') && strlen($request->input('title')) > 0) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }

            if ($request->has('genre') && strlen($request->input('genre')) > 0) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            if ($request->has('creators') && strlen($request->input('creators')) > 0) {
                $creators = $request->input('creators');
                $query->where('creators', 'like', '%' . $creators . '%');
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $mangas = $query->get();

            return response()->json([
                'error' => false,
                'data' => $mangas,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
