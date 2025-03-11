<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'publisher' => 'string|nullable|max:255',
            'publication_date' => 'date|nullable',
            'genre' => 'string|nullable|max:255',
            'comment' => 'string|nullable|max:255',
            'status_id' => 'required|integer|min:1|max:4',
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
    }

    public function sort(Request $request)
    {
        try {
            $books = $this->sorting($request, Book::class);
            $response = [
                'error' => false,
                'data' => $books,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
