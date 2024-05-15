<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
    public function update(Request $request) {
        Log::debug('Request data:', $request->all());

        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $file = $request->file('avatar');
        $name = $file->hashName();
        Storage::put('public/avatars/1', $request->file('avatar'));
        $request->user()->avatar = $name;

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request) {

        $request->user()->avatar = null;
        $request->user()->save();
        return Redirect::route('profile.edit');
    }
}
