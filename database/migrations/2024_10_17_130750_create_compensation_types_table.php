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
        Schema::create('compensation_types', function (Blueprint $table) {
            $table->string('compensation_code')->primary();

            $table->string('compensation_name');
            $table->string('shorthand');
            $table->decimal('amount', 10, 2);
            $table->boolean('is_taxable')->default(false);
            $table->boolean('is_fixed')->default(false);

            // NO FURTHER ATTRIBUTES    

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compensation_types');
    }
};
