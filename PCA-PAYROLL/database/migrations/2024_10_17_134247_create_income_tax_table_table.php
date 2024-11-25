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
        Schema::create('income_taxes', function (Blueprint $table) {
            $table->integer('tax_bracket')->primary();

            $table->decimal('lower_bound', 10, 2);
            $table->decimal('upper_bound', 10, 2);
            $table->decimal('base_amount', 10, 2);
            $table->decimal('tax_rate', 10, 2);

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('income_taxes');
    }
};