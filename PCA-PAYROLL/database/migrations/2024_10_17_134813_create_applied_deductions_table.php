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
            $table->string('applied_deduction_code')->primary(); // PK
            $table->decimal('amount', 10, 2);
            $table->text('remarks')->nullable();

            $table->string('employee_number');
            $table->string('deduction_code');

            $table->foreign('employee_number')->references('employee_number')->on('employees');
            $table->foreign('deduction_code')->references('deduction_code')->on('deduction_types');

            // NO FURTHER ATTRIBUTES

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
