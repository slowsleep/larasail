<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cartoon;
use Illuminate\Support\Facades\Validator;
use App\Traits\SortableTrait;
use App\Http\Controllers\ActivityLogController;
use Illuminate\Support\Facades\Auth;

class CartoonController extends Controller
{
    use SortableTrait;

    public function update(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'genre' => 'string|nullable|max:255',
                'year' => 'integer|nullable|min:1|max:9999',
                'publisher' => 'string|nullable|max:255',
                'comment' => 'string|nullable|max:255',
                'status_id' => 'required|integer|min:1|max:4',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => true, 'message' => $validator->errors()], status: 400);
            }

            $cartoon = Cartoon::findOrFail($request->id);
            $cartoon->update($request->all());

            ActivityLogController::store([
                'user_id' => Auth::user()->id,
                'action' => 'update',
                'model' => 'App\Models\Cartoon',
                'model_id' => $cartoon->id,
                'data' => $cartoon->title,
            ]);

            $response = [
                'error' => false,
                'data' => [
                    'cartoon' => $cartoon,
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
            $cartoons = $this->sorting($request, Cartoon::class);
            $response = [
                'error' => false,
                'data' => $cartoons,
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    public function search(Request $request)
    {
        try {
            $query = Cartoon::query();

            if ($request->has('title') && !empty($request->input('title'))) {
                $title = $request->input('title');
                $query->where('title', 'like', '%' . $title . '%');
            }


            if ($request->has('genre') && !empty($request->input('genre'))) {
                $genre = $request->input('genre');
                $query->where('genre', 'like', '%' . $genre . '%');
            }

            if ($request->has('year') && !empty($request->input('year'))) {
                $year = $request->input('year');
                $query->where('year', $year);
            }

            if ($request->has('publisher') && !empty($request->input('publisher'))) {
                $publisher = $request->input('publisher');
                $query->where('publisher', 'like', '%' . $publisher. '%');
            }

            if ($request->has('status_id') && !empty($request->input('status_id'))) {
                $statusId = $request->input('status_id');
                $query->where('status_id', $statusId);
            }

            $cartoons = $query->get();

            return response()->json(['error' => false, 'data' => $cartoons]);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'message' => $e->getMessage()], status: 500);
        }
    }
}
