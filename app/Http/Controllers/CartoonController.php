<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cartoon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class CartoonController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $user_cartoons = Cartoon::where('user_id', $user->id)->get();
        return Inertia::render('Cartoon/Cartoons', ['cartoons' => $user_cartoons]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'genre' => 'string|nullable|max:255',
            'year' => 'integer|nullable|min:1|max:9999',
            'publisher' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $cartoon = Cartoon::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'genre' => $request->genre,
            'year' => $request->year,
            'publisher' => $request->publisher,
            'comment' => $request->comment,
            'status_id' => $request->status_id,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Cartoon',
            'model_id' => $cartoon->id,
            'data' => $cartoon->title,
        ]);

        return Inertia::render('Cartoon/Cartoons', ['cartoon' => $cartoon, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Cartoon::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Cartoon',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('cartoons.index');
    }
}
