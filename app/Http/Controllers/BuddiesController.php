<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use App\Models\Follow;

class BuddiesController extends Controller
{
    public function index(): Response
    {
        $buddies = User::whereNot('id', auth()->user()->id)
            ->whereIn('id', Follow::where('follower_id', auth()->user()->id)->pluck('followed_id')->all())
            ->get();

        return Inertia::render('Buddies/Buddies', ['buddies' => $buddies]);
    }

    public function search(Request $request): Response {
        $request->merge([
            'findall' => filter_var($request->input('findall'), FILTER_VALIDATE_BOOLEAN),
        ]);
        $request->validate([
            'search' => 'string|max:255',
            'findall' => 'boolean',
        ]);
        $buddies = [];

        if ($request->findall) {
            $buddies = User::whereNot('id', auth()->user()->id)
                ->where('name', 'like', '%' . $request->search . '%')
                ->get();
        } else {
            $buddies = User::whereNot('users.id', auth()->user()->id)
                ->whereIn('users.id', Follow::where('follower_id', auth()->user()->id)->pluck('followed_id'))
                ->where('name', 'like', '%' . $request->search . '%')
                ->get();
        }

        return Inertia::render('Buddies/Buddies', ['buddies' => $buddies]);
    }
}
