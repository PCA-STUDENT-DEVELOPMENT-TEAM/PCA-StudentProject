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
        Schema::create('dtr_entries', function (Blueprint $table) {
            $table->string('dtr_entry_code')->primary();
            $table->date('date');  // YYYY-MM-DD.
            $table->time('time_in_am'); // 01:00:00 - 24:00:00  (format)
            $table->time('time_out_am'); // 01:00:00 - 24:00:00
            $table->time('time_in_pm');  // 01:00:00 - 24:00:00
            $table->time('time_out_pm'); // 01:00:00 - 24:00:00
            $table->integer('tardy_minutes')->default(0); 
            $table->integer('undertime_minutes')->default(0); 
            $table->integer('work_minutes');   

            $table->string('dtr_code');
            $table->foreign('dtr_code')->references('dtr_code')->on('daily_time_records');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dtr_entries');
    }
};
