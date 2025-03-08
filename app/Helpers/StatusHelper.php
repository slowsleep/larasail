<?php
namespace App\Helpers;

use Illuminate\Support\Facades\Cache;
use App\Models\Status;


class StatusHelper
{
    public static function getStatusIdByName($name)
    {
        return Cache::remember("status_id_{$name}", 60, function () use ($name) {
            return Status::query()->where('name', $name)->value('id');
        });
    }

    public static function getStatusNameById($id)
    {
        return Cache::remember("status_name_{$id}", 60, function () use ($id) {
            return Status::query()->where('id', $id)->value('name');
        });
    }
}
