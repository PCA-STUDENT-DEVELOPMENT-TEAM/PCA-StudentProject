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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id('appointment_code');

			/* Appointments refer to the type of employee;
				i.e. "this person was 'appointed' as this type of employee." */

            $table->foreignId('compensation_code')->constrained('compensation_types')->references('compensation_code')->onDelete('cascade')->nullable();

			$table->string('type')->unique();
			$table->boolean('has_mandatory_deduction');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
