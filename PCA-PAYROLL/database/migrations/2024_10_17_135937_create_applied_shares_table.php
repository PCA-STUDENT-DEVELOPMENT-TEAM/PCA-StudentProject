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
        Schema::create('applied_shares', function (Blueprint $table) {
            $table->string('app_share_code')->primary();

            $table->decimal('amount', 10, 2);

            $table->string('employee_number');
            $table->string('agency_share_code');

            $table->foreign('employee_number')->references('employee_number')->on('employees');
            $table->foreign('agency_share_code')->references('agency_share_code')->on('agency_shares');

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applied_shares');
    }
};
