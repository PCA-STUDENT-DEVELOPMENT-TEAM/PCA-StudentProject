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
        Schema::create('daily_time_entries', function (Blueprint $table) {
            $table->id('dtr_entry_code');

			$table->date('date');
			$table->time('time_in_am')->nullable();
			$table->time('time_out_am')->nullable();
			$table->time('time_in_pm')->nullable();
			$table->time('time_out_pm')->nullable();
			$table->integer('tardy_minutes')->nullable();
			$table->integer('undertime_minutes')->nullable();
			$table->integer('work_minutes')->nullable();

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_time_entries');
    }
};
