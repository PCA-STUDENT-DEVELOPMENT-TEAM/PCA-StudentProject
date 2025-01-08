<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_entries', function (Blueprint $table) {
            $table->id('daily_entry_code');

			$table->time('am_clockin');
			$table->time('am_clockout');
            $table->time('pm_clockin');
			$table->time('pm_clockout');
			$table->integer('work_minutes', false, true);
			$table->integer('under_minutes', false, true);
			$table->integer('late_minutes', false, true);
			$table->double('credits');

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_entries');
    }
};
