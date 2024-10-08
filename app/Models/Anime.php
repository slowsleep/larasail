<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anime extends Model
{
    use HasFactory;

    protected $table = 'anime';

    protected $fillable = [
        'user_id',
        'title',
        'season',
        'episode',
        'genre',
        'publisher',
        'translator',
        'comment',
        'finished',
        'abandoned',
    ];
}
