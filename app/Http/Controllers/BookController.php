<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class BookController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $user_books = Book::where('user_id', $user->id)->get();
        return Inertia::render('Book/Books', ['books' => $user_books]);
    }

    public function store(Request $request): Response
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'string|nullable|max:255',
            'publication_date' => 'date|nullable',
            'genre' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'finished' => 'boolean',
            'abandoned' => 'boolean',
        ]);

        $book = Book::create([
            'user_id' => Auth::user()->id,
            'title' => $request->title,
            'author' => $request->author,
            'publisher' => $request->publisher,
            'publication_date' => $request->publication_date,
            'genre' => $request->genre,
            'comment' => $request->comment,
            'finished' => $request->finished,
            'abandoned' => $request->abandoned,
        ]);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'store',
            'model' => 'App\Models\Book',
            'model_id' => $book->id,
            'data' => $book->title,
        ]);

        return Inertia::render('Book/Books', ['book' => $book, 'action' => 'create']);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Book::destroy($request->id);

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'destroy',
            'model' => 'App\Models\Book',
            'model_id' => $request->id,
            'data' => null,
        ]);

        return Redirect::route('books.index');
    }
}
