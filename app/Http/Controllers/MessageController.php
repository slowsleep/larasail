<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'message' => 'required|string|max:4096',
        ]);

        $message = new Message([
            'chat_id' => $request->chat_id,
            'user_id' => auth()->id(),
            'content' => $request->message,
        ]);

        $message->save();
        $message->load('user');

        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['status' => 'ok', 'message' => $message]);
    }

}
