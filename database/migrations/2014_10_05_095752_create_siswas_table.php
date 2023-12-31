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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string("nama");
            $table->string("nis", 10)->unique();
            $table->string("nisn", 10)->unique();
            $table->foreignId("id_kelas")->constrained("kelas")->onUpdate("cascade");
            $table->enum("jenis_kelamin", ["Laki-laki", "Perempuan"])->nullable();
            $table->string("tempat_lahir")->nullable();
            $table->date("tanggal_lahir")->nullable();
            $table->string("alamat")->nullable();
            $table->string("agama")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
