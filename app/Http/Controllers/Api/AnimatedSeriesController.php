<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Traits\SortableTrait;
use App\Http\Controllers\ActivityLogController;
use App\Models\AnimatedSeries;
use Illuminate\Support\Facades\Auth;

class AnimatedSeriesController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'season' => 'integer|min:1',
                'episode' => 'integer|min:0',
                'genre' => 'string|nullable|max:255',
                'year' => 'integer|nullable|min:1|max:9999',
                'publisher' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

            $animatedSeries = AnimatedSeries::findOrFail($request->id);
            $animatedSeries->update($request->all());

            ActivityLogController::store([
                'user_id' => Auth::user()->id,
                'action' => 'update',
                'model' => 'App\Models\AnimatedSeries',
                'model_id' => $animatedSeries->id,
                'data' => $animatedSeries->title,
            ]);

            $response = [
                'error' => false,
                'data' => [
                    'singleAnimatedSeries' => $animatedSeries,
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
            $animatedSeries = $this->sorting($request, AnimatedSeries::class);
            $response = [
                'error' => false,
                'data' => $animatedSeries,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function search(Request $request)
    {
        try {
            $query = AnimatedSeries::query();

            if ($request->has('title') && !empty($request->input('title'))) {
                $search = $request->input('title');
                $query->where('title', 'like', '%' . $search . '%');
            }

            if ($request->has('genre') && !empty($request->input('genre'))) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            if ($request->has('year') && !empty($request->input('year'))) {
                $year = $request->input('year');
                $query->where('year', $year);
            }

            if ($request->has('publisher') && !empty($request->input('publisher'))) {
                $publisher = $request->input('publisher');
                $query->where('publisher', 'like', '%' . $publisher . '%');
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $animatedSeries = $query->get();

            return response()->json([
                'error' => false,
                'data' => $animatedSeries
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
