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
        Schema::create('payroll_entries', function (Blueprint $table) {
            $table->string('payroll_entry_code')->primary();

            $table->string('current_position'); // this one is extracted in the employee table

            $table->string('employee_number');
            $table->string('payroll_sheet_code');
            
            $table->foreign('employee_number')->references('employee_number')->on('employees');
            $table->foreign('payroll_sheet_code')->references('payroll_sheet_code')->on('payroll_sheets');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_entries');
    }
};
