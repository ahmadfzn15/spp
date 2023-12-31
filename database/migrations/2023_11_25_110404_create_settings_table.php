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
        Schema::create('setting', function (Blueprint $table) {
            $table->id();
            $table->string("logo")->nullable();
            $table->string("nama_instansi")->nullable();
            $table->string("slogan")->nullable();
            $table->string("email")->nullable();
            $table->string("no_telepon")->nullable();
            $table->string("alamat")->nullable();
            $table->string("copyright")->nullable();
            $table->integer("biaya_spp")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting');
    }
};
