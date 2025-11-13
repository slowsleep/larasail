<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\SortableTrait;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'author' => 'required|string|max:255',
                'publisher' => 'string|nullable|max:255',
                'publication_date' => 'date|nullable',
                'genre' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

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
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
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

    public function search(Request $request)
    {
        try {
            $query = Book::query();

            if ($request->filled('title')) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }

            if ($request->filled('author')) {
                $author = $request->input('author');
                $query->where('author', 'like', '%' . $author . '%');
            }

            if ($request->filled('genre')) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            if ($request->filled('publisher')) {
                $publisher = $request->input('publisher');
                $query->where('publisher', 'like', '%' . $publisher . '%');
            }

            if ($request->has('year') && !empty($request->input('year'))) {
                $year = $request->input('year');
                $query->whereYear('publication_date', $year);
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $books = $query->get();

            return response()->json([
                'error' => false,
                'data' => $books
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
