<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{

    public static function store(Array $request): void
    {
        ActivityLog::create([
            'user_id' => $request['user_id'],
            'action' => $request['action'],
            'model' => $request['model'],
            'model_id' => $request['model_id'],
            'data' => $request['data'] ? $request['data'] : "",
        ]);
    }

    public function get(Request $request)
    {
        try {
            $request->validate(['user_id' => 'required|integer|exists:users,id']);
            $activity = ActivityLog::select('created_at', 'action', 'model', 'model_id')->where('user_id', $request->user_id)->get();

            if ($activity) {
                return response()->json(['status' => 'ok', 'activity' => $activity]);
            }

            return response()->json(['status' => 'ok', 'message' => 'no activity']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
