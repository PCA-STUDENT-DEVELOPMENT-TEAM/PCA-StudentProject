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
            $table->string('travel_order_code')->primary();

            $table->date('date_filed');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('travel_order_type');
            $table->string('travel_order_description')->nullable();
            $table->string('travel_order_status');

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
        Schema::dropIfExists('travel_orders');
    }
};
