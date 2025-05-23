<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Manga;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class MangaController extends Controller
{
    public function index() {
        $user = Auth::user();
        $user_mangas = Manga::where('user_id', $user->id)->get();
        return Inertia::render('Manga/Manga', ['mangas' => $user_mangas]);
    }

    public function store(Request $request): Response {
        $request->validate([
            'title' => 'required|string|max:255',
            'volume' => 'required|integer|min:1',
            'chapter' => 'required|integer|min:0',
            'genre' => 'string|nullable|max:255',
            'creators' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
        ]);

        $manga = Manga::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'volume' => $request->volume,
            'chapter' => $request->chapter,
            'genre' => $request->genre,
            'creators' => $request->creators,
            'comment' => $request->comment,
            'status_id' => $request->status_id,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Manga',
            'model_id' => $manga->id,
            'data' => $manga->title,
        ]);

        return Inertia::render('Manga/Manga', ['manga' => $manga, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse{
        Manga::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Manga',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('mangas.index');
    }
}
