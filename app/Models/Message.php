<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;
use App\Models\Chat;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chat_id',
        'content'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function chat() : BelongsTo
    {
        return $this->belongsTo(Chat::class);
    }

}
