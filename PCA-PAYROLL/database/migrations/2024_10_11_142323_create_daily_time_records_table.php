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
        Schema::create('daily_time_records', function (Blueprint $table) {
            $table->string('dtr_code')->primary(); // PK
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('total_tardy_minutes')->nullable();
            $table->integer('total_undertime_minutes');
            $table->integer('total_work_minutes');

            $table->string('employee_number')->references('employee_number')->on('employees');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_time_records');
    }
};
