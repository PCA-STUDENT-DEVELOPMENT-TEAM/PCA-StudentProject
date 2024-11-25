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
        Schema::create('agency_shares', function (Blueprint $table) {
            $table->string('agency_share_code')->primary(); // PK

            $table->string('agency_share_name');
            $table->string('shorthand');
            $table->decimal('amount',10,2);
            $table->boolean('is_mandatory')->default(false);
            $table->decimal('remittance_percent',10,2);
            $table->decimal('ceiling_amount',10,2);

            // NO FURTHER ATTRIBUTES

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agency_shares');
    }
};
