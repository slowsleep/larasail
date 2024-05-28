<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Message;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'is_group',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_chat')->withPivot('is_admin')->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

}
