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
        Schema::create('payroll_sheets', function (Blueprint $table) {
            $table->string('payroll_sheet_code')->primary();

            $table->string('payroll_name');
            $table->string('payroll_type');
            $table->date('start_date');
            $table->date('end_date');
            $table->date('date_created');
            $table->date('date_posted');
            $table->date('date_paid');

            $table->string('prepared_by');
            $table->string('recommended_by')->nullable();
            $table->string('approved_by')->nullable();
            $table->string('certified_by')->nullable();

            $table->foreign('prepared_by')->references('employee_number')->on('employees');
            $table->foreign('recommended_by')->references('employee_number')->on('employees');
            $table->foreign('approved_by')->references('employee_number')->on('employees');
            $table->foreign('certified_by')->references('employee_number')->on('employees');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_sheets');
    }
};
