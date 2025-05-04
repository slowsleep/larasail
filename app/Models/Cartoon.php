<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cartoon extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'genre',
        'year',
        'publisher',
        'comment',
        'status_id',
    ];
}
