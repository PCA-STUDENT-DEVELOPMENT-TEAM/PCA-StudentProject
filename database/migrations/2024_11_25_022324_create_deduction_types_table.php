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
        Schema::create('deduction_types', function (Blueprint $table) {
            $table->id('deduction_code');
            $table->string('deduction_name');
            $table->string('shorthand');
            $table->double('amount');
            $table->boolean('is_mandatory')->default(false);
            $table->double('remittance_percent');
            $table->double('ceiling_amount');
            $table->string('compensation_links')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deduction_types');
    }
};
