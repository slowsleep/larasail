<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                'title' => 'required|string|max:255',
                'year' => 'integer|nullable|min:1',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

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
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
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

    public function search(Request $request)
    {
        try {
            $query = Movie::query();

            if ($request->has('title') && !empty($request->input('title'))) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }

            if ($request->has('year') && !empty($request->input('year'))) {
                $year = $request->input('year');
                $query->where('year', $year);
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $movies = $query->get();

            return response()->json(['error' => false, 'data' => $movies]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
