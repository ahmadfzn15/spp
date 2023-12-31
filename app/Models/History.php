<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    protected $table = 'history';
    protected $guarded = ['id'];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, "id_siswa");
    }

    public function scopeHistory(Builder $query)
    {
        if (auth()->user()->role == "siswa") {
            $id_siswa = Siswa::where("nis", auth()->user()->nis)->first()->id;

            $pembayaran = $query->with(['siswa', 'siswa.kelas'])->where("id_siswa", $id_siswa)->get();
        }

        if (auth()->user()->role == "admin") {
            $pembayaran = $query->with(['siswa', 'siswa.kelas'])->get();
        }

        return $pembayaran;
    }
}
