<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{

    public function update(Request $request)
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

        $book = Book::findOrFail($request->id);
        $book->update($request->all());

        ActivityLogController::store([
            'user_id' => Auth::user()->id,
            'action' => 'update',
            'model' => 'App\Models\Game',
            'model_id' => $book->id,
            'data' => $book->title,
        ]);

        $response = [
            'error' => false,
            'data' => [
                'book' => $book,
                'action' => 'update'
            ]
        ];

        return response()->json($response);

        // return Inertia::render('Book/Books', ['book' => $book, 'action' => 'update']);
    }
}
