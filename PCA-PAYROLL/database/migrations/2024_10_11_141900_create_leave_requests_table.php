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
        Schema::create('leave_requests', function (Blueprint $table) {
            $table->string('leave_request_code')->primary();

            $table->date('date_filed');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('leave_type');
            $table->string('leave_description')->nullable();
            $table->string('leave_status');

            $table->string('approver_number');
            $table->string('employee_number');

            $table->foreign('approver_number')->references('employee_number')->on('employees');
            $table->foreign('employee_number')->references('employee_number')->on('employees');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_requests');
    }
};
