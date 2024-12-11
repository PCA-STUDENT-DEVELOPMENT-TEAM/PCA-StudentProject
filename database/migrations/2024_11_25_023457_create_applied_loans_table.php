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
        Schema::create('applied_loans', function (Blueprint $table) {
            $table->id('app_loan_code');

			$table->date('start_date');
			$table->date('end_date');
			$table->double('monthly_amount');
			$table->double('begin_balance');
			$table->double('paid_amount');
			$table->double('balance');
            $table->double('previous_paid');

			$table->foreignId('employee_code')->constrained('employees')->references('employee_code');
			$table->foreignId('loan_code')->constrained('loan_types')->references('loan_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_loans');
    }
};
