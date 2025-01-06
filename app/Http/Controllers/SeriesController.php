<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Series;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class SeriesController extends Controller
{
    public function index() {
        $user = Auth::user();
        $user_series = Series::where('user_id', $user->id)->get();
        return Inertia::render('Series/Series', [
            'series' => $user_series,
        ]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'season' => 'integer|min:1',
            'episode' => 'integer|min:0',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $singleSeries = Series::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'season' => $request->season,
            'episode' => $request->episode,
            'comment' => $request->comment,
            'finished' => $request->finished,
            'abandoned' => $request->abandoned,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Series',
            'model_id' => $singleSeries->id,
            'data' => $singleSeries->title,
        ]);

        return Inertia::render('Series/Series', ['singleSeries' => $singleSeries, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Series::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Series',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('series.index');
    }
}
