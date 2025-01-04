<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Return sorting table rows with columns - title, created_at, finished, abandoned
 */
trait SortableTrait
{
    public function sorting(Request $request, $model)
    {
        $request->validate([
            'sort_by' => 'required|string|in:title,created_at,status',
            'sort_order' => 'required|in:asc,desc,in-progress,finished,abandoned',
        ]);
        $sort_by = $request->sort_by;
        $sort_order = $request->sort_order;
        $user_id = Auth::user()->id;

        if ($sort_by === 'status') {
            if ($sort_order === 'in-progress') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderBy('finished', 'asc')
                    ->orderBy('abandoned', 'asc')
                    ->get();
            } else if ($sort_order === 'finished') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderBy('finished', 'desc')
                    ->get();
            } else if ($sort_order === 'abandoned') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderBy('abandoned', 'desc')
                    ->get();
            }
        } else {
            $sortedItems = $model::where('user_id', $user_id)
                ->orderBy($sort_by, $sort_order)
                ->get();
        }

        return $sortedItems;
    }
}
