<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Series;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class SeriesController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'title' => 'required|string|max:255',
            'season' => 'integer|min:1',
            'episode' => 'integer|min:1',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
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
        // return Inertia::render('Series/Series', ['singleSeries' => $singleSeries, 'action' => 'update']);
    }
}