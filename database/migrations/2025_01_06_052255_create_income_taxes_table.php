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
            $table->id('income_tax_code');

			/* The lowerbound and upperbound determine the tax bracket.
				The tax rate is always a percentage, and it must be processed accordingly. */

			$table->double('lowerbound');
			$table->double('upperbound');
			$table->double('base_amount');
			$table->double('tax_rate');

            $table->timestamps();


            /*
                The income tax is hardcoded using procedure in postgres.
            */
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
