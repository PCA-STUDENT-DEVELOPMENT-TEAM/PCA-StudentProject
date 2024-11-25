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
        Schema::create('employees', function (Blueprint $table) {
            $table->string('employee_number')->primary();

            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('first_name');
            $table->string('name_extension')->nullable();

            $table->string('salary_type'); // Per Month? or Per 15 days?
            $table->integer('salary_step');

            $table->string('appointment_type'); // casual, COS, external, JO, lecturer...
            $table->string('position_title'); 
            $table->string('station_name');
            
            $table->foreign('appointment_type')->references('appointment_type')->on('appointment');
            $table->foreign('position_title')->references('position_title')->on('positions');
            $table->foreign('station_name')->references('station_name')->on('stations');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
