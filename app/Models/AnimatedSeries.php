<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnimatedSeries extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'season',
        'episode',
        'genre',
        'year',
        'publisher',
        'comment',
        'status_id',
    ];
}
