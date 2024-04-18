<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;

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
}
