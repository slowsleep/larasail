<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Helpers\StatusHelper;

/**
 * Return sorting table rows with columns - title, created_at, finished, abandoned
 */
trait SortableTrait
{
    public function sorting(Request $request, $model)
    {
        $request->validate([
            'sort_by' => 'required|string|in:title,created_at,status',
            'sort_order' => 'required|in:asc,desc,planning,in-progress,finished,abandoned',
        ]);
        $sort_by = $request->sort_by;
        $sort_order = $request->sort_order;
        $user_id = Auth::user()->id;

        if ($sort_by === 'status') {
            if ($sort_order === 'planning') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderByRaw('CASE WHEN status_id = ' . StatusHelper::getStatusIdByName('planning') . ' THEN 1 ELSE 2 END')
                    ->get();
            } else if ($sort_order === 'in-progress') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderByRaw('CASE WHEN status_id = ' . StatusHelper::getStatusIdByName('in progress') . ' THEN 1 ELSE 2 END')
                    ->get();
            } else if ($sort_order === 'finished') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderByRaw('CASE WHEN status_id = ' . StatusHelper::getStatusIdByName('finished') . ' THEN 1 ELSE 2 END')
                    ->get();
            } else if ($sort_order === 'abandoned') {
                $sortedItems = $model::where('user_id', $user_id)
                    ->orderByRaw('CASE WHEN status_id = ' . StatusHelper::getStatusIdByName('abandoned') . ' THEN 1 ELSE 2 END')
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
