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
            $table->id('leave_request_code');

			$table->date('date_filed');
			$table->date('start_date');
			$table->date('end_date');
			$table->string('leave_request_type');
			$table->string('leave_request_description')->nullable();
			$table->string('leave_request_status');

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');
			$table->foreignId('approver_code')->constrained('employees')->references('employee_code');

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
