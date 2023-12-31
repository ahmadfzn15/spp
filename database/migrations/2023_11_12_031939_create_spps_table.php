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
        Schema::create('spp', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_siswa")->constrained("siswa")->onDelete("cascade");
            $table->foreignId("id_periode")->constrained("periode")->onDelete("cascade");
            $table->foreignId("id_status")->constrained("status")->onDelete("cascade");
            $table->integer("jumlah_bayar");
            $table->boolean("jatuh_tempo")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spp');
    }
};
