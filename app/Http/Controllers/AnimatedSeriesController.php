<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AnimatedSeries;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class AnimatedSeriesController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $animatedSeries = AnimatedSeries::where('user_id', $user->id)->get();
        return Inertia::render('AnimatedSeries/AnimatedSeries', ['animatedSeries' => $animatedSeries]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'season' => 'integer|min:1',
            'episode' => 'integer|min:0',
            'genre' => 'string|nullable|max:255',
            'year' => 'integer|nullable|min:1|max:9999',
            'publisher' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $singleAnimatedSeries = AnimatedSeries::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'season' => $request->season,
            'episode' => $request->episode,
            'genre' => $request->genre,
            'year' => $request->year,
            'publisher' => $request->publisher,
            'comment' => $request->comment,
            'status_id' => $request->status_id,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\AnimatedSeries',
            'model_id' => $singleAnimatedSeries->id,
            'data' => $singleAnimatedSeries->title,
        ]);

        return Inertia::render('AnimatedSeries/AnimatedSeries', ['singleAnimatedSeries' => $singleAnimatedSeries, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        AnimatedSeries::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\AnimatedSeries',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('animated-series.index');
    }
}
