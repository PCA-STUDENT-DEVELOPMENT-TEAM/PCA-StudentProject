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
        Schema::create('travel_orders', function (Blueprint $table) {
            $table->id('travel_order_code');

			$table->date('date_filed');
			$table->date('start_date');
			$table->date('end_date');
			$table->string('travel_order_type');
			$table->string('travel_order_description')->nullable();
			$table->string('travel_order_status');

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
        Schema::dropIfExists('travel_orders');
    }
};
