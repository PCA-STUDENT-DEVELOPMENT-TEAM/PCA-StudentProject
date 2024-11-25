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
            $table->string('applied_loan_code')->primary(); // PK

            $table->date('date_started');
            $table->date('date_ended')->nullable();
            $table->decimal('monthly_paid', 10, 2);
            $table->decimal('begin_balance', 10, 2);
            $table->decimal('paid_amount', 10, 2);
            $table->decimal('balance', 10, 2);
            
            $table->string('employee_number');
            $table->string('loan_name');

            $table->foreign('employee_number')->references('employee_number')->on('employees');
            $table->foreign('loan_name')->references('loan_name')->on('loan_types');


            // NO FURTHER ATTRIBUTES

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
