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
        Schema::create('signatories', function (Blueprint $table) {
            $table->id('signatory_code');
            $table->string('signatory_template');

            $table->foreignId('prepared_by')->constrained('employees')->references('employee_code');
            $table->foreignId('recommended_by')->constrained('employees')->references('employee_code');
            $table->foreignId('certificate_by')->constrained('employees')->references('employee_code');
            $table->foreignId('approved_by')->constrained('employees')->references('employee_code');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signatories');
    }
};
