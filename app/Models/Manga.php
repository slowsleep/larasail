<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manga extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'genre',
        'creators',
        'volume',
        'chapter',
        'comment',
        'finished',
        'abandoned',
    ];
}
