<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Chat;
use App\Models\User;

class ChatController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $chats = Chat::with('users')
            ->whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();

        return Inertia::render('Chats/Chats', ['chats' => $chats]);
    }

    public function show(string $name)
    {
        $user = User::where('name', $name)->first();
        $currentUser = auth()->user();
        $chat = Chat::where('is_group', false)
            ->whereHas('users', function($query) use ($currentUser) {
                $query->where('user_id', $currentUser->id);
            })
            ->whereHas('users', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->first();

        if (!$chat) {
            $chat = Chat::create(['name' => $currentUser->name . ' и ' . $user->name, 'is_group' => false]);
            $chat->users()->attach([$currentUser->id, $user->id]);
        }

        $chat->load('messages.user');

        $chats = Chat::with('users')
                ->whereHas('users', function($query) use ($currentUser) {
                    $query->where('user_id', $currentUser->id);
                })
                ->get();

        return Inertia::render('Chats/Chats', ['chats' => $chats, 'chat' => $chat]);
    }
}
