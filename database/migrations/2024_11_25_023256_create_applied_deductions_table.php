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
        Schema::create('applied_deductions', function (Blueprint $table) {
            $table->id('app_ded_code');

			$table->double('amount');

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');
			$table->foreignId('deduction_code')->constrained('deduction_types')->references('deduction_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_deductions');
    }
};
