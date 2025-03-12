<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->integer('year')->nullable()->after('title');
        });

        DB::table('movies')
            ->whereNotNull('part')
            ->update(['title' => DB::raw("CONCAT(title, ' ', part)")]);

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('part');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->integer('part')->nullable()->after('title');
        });

        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('year');
        });
    }
};
