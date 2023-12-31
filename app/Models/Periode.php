<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Periode extends Model
{
    use HasFactory;

    protected $table = "periode";
    protected $guarded = ["periode"];

    public function spp()
    {
        return $this->hasMany(Spp::class);
    }

    public function scopeAddPeriode(Builder $query, Request $request)
    {
        $months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        foreach ($months as $key) {
            $query->create([
                "bulan" => $key,
                "tahun_pertama" => $request->tahunPertama,
                "tahun_kedua" => $request->tahunKedua
            ]);
        }
    }
}
