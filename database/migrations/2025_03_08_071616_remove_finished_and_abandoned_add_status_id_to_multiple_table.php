<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Helpers\StatusHelper;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tables = ['anime', 'series', 'movies', 'manga', 'books', 'games'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->unsignedBigInteger('status_id')->after('comment')->default(StatusHelper::getStatusIdByName('planning'));
                $table->foreign('status_id')->references('id')->on('statuses');
            });

            DB::table($table)->where('finished', true)->update(['status_id' => StatusHelper::getStatusIdByName('finished')]);
            DB::table($table)->where('abandoned', true)->update(['status_id' => StatusHelper::getStatusIdByName('abandoned')]);
            DB::table($table)->where('finished', false)->where('abandoned', false)->update(['status_id' => StatusHelper::getStatusIdByName('in progress')]);

            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn(['finished', 'abandoned']);
            });
        }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = ['anime', 'series', 'movies', 'manga', 'books', 'games'];

        foreach ($tables as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->boolean('finished')->after('comment')->default(false);
                $table->boolean('abandoned')->after('finished')->default(false);
            });

            DB::table($table)->where('status_id', StatusHelper::getStatusIdByName('finished'))->update(['finished' => true]);
            DB::table($table)->where('status_id', StatusHelper::getStatusIdByName('abandoned'))->update(['abandoned' => true]);

            Schema::table($table, function (Blueprint $table) {
                $table->dropForeign(['status_id']);
                $table->dropColumn('status_id');
            });
        }
    }
};
