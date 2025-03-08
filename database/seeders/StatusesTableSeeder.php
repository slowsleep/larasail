<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('statuses')->insert([
            ['name' => 'planning', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'in progress', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'finished', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'abandoned', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
