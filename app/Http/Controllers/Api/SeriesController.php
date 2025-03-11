<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Series;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class SeriesController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'season' => 'integer|min:1',
            'episode' => 'integer|min:0',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $singleSeries = Series::findOrFail($request->id);
        $singleSeries->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Series',
            'model_id' => $singleSeries->id,
            'data' => $singleSeries->title,
        ]);

        $response = [
            'error' => false,
            'data' => [
                'singleSeries' => $singleSeries,
                'action' => 'update'
            ]
        ];

        return response()->json($response);
    }

    public function sort(Request $request)
    {
        try {
            $series = $this->sorting($request, Series::class);
            $response = [
                'error' => false,
                'data' => $series,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

}
