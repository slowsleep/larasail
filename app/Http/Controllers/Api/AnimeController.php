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

    public function search(Request $request)
    {
        try {
            $query = Anime::query();

            if ($request->has('title') && !empty($request->input('title'))) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }

            if ($request->has('genre') && !empty($request->input('genre'))) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            // TODO: add year column to anime table and uncomment the following lines
            // if ($request->has('year') && !empty($request->input('year'))) {
            //     $year = $request->input('year');
            //     $query->where('year', $year);
            // }

            if ($request->has('publisher') && !empty($request->input('publisher'))) {
                $publisher = $request->input('publisher');
                $query->where('publisher', 'like', '%' . $publisher . '%');
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $anime = $query->get();

            return response()->json([
                'error' => false,
                'data' => $anime
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
