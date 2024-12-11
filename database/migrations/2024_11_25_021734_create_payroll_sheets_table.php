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
            $table->id('payroll_sheet_code');

			$table->string('payroll_name')->unique();
			$table->string('payroll_type');
			$table->date('start_date');
			$table->date('end_date');
			$table->date('date_created');
			$table->date('date_posted');
			$table->date('date_paid');
            $table->string('fund_cluster');
            $table->boolean('include_deduction');
            // $table->string('compensation_links');
			/* There is no need to record the employee numbers or codes of the signatories. */
            $table->timestamps();

            $table->foreignId('signatory_code')->constrained('signatories')->references('signatory_code');
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
