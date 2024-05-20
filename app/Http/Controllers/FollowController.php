<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Follow;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    public function insert(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'followed_id' => 'required|integer|exists:users,id',
        ]);
        $req = Follow::create([
            'follower_id' => $user->id,
            'followed_id' => $request->followed_id,
        ]);

        if ($req->id) {
            return response()->json(['status' => 'ok']);
        }

    }

    public function destroy(Request $request) {
        $user = Auth::user();
        $request->validate([
            'followed_id' => 'required|integer|exists:users,id',
        ]);
        $req = Follow::where('follower_id', $user->id)->where('followed_id', $request->followed_id)->first();
        $req->delete();

        return response()->json(['status' => 'ok']);
    }

    public function checkStatus(Request $request) {
        $request->validate(['followed_id' => 'required|integer|exists:users,id']);
        $following_query = Follow::where('follower_id', auth()->user()->id)->where('followed_id', $request->followed_id)->exists();
        $followed_by_query = Follow::where('follower_id', $request->followed_id)->where('followed_id', auth()->user()->id)->exists();
        $status = '';

        if ($following_query && $followed_by_query) {
            $status = 'friends';
        } else if ($following_query) {
            $status = 'following';
        } else if ($followed_by_query) {
            $status = 'followed';
        } else {
            $status = 'none';
        }

        return response()->json(['status' => $status]);

    }
}
