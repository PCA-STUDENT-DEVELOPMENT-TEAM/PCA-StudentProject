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
        Schema::create('applied_compensations', function (Blueprint $table) {
            $table->string('applied_compensation_code')->primary(); // PK
            $table->decimal('amount',10,2);
            $table->integer('quantity');

            $table->string('employee_number');
            $table->string('compensation_code');

            $table->foreign('employee_number')->references('employee_number')->on('employees');
            $table->foreign('compensation_code')->references('compensation_code')->on('compensation_types');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_compensations');
    }
};
