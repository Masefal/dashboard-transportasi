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
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kota');
            $table->decimal('umr', 15, 2)->nullable();
            $table->decimal('waktu_tempuh', 8, 2)->nullable();
            $table->integer('jumlah_armada')->nullable();
            $table->integer('kendaraan_pribadi')->nullable();
            $table->decimal('tarif_minimum', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
