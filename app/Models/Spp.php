<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Spp extends Model
{
    use HasFactory;

    protected $table = "spp";
    protected $guarded = ["id"];

    public static function generateSpp()
    {
        $date = Carbon::now();
        $siswa = Siswa::where("nis", auth()->user()->nis)->first();

        $sppSiswa = Spp::where("id_siswa", $siswa->id)->get();
        if ($sppSiswa->count() == 0) {
            $periode = Periode::all();
            foreach ($periode as $key) {
                Spp::create([
                    "id_siswa" => $siswa->id,
                    "id_periode" => $key->id,
                    "id_status" => 1,
                    "jumlah_bayar" => 70000
                ]);
            }
        }

        if ($date->month >= 7) {
            $periode = Periode::where("tahun_pertama", $date->year)->where("bulan", $date->monthName)->first();
        } else {
            $periode = Periode::where("tahun_kedua", $date->year)->where("bulan", $date->monthName)->first();
        }

        $maxPeriode = Periode::orderBy("tahun_kedua", "desc")->first();

        $month = Spp::getMonth($periode->bulan);

        $maxDate = Carbon::create($maxPeriode->tahun_kedua, $month, 1);

        $spp = new Spp();
        if ($date->day >= 1 && $date->lt($maxDate)) {
            $d = $spp->where("id_siswa", $siswa->id)->where("id_periode", $periode->id)->where("id_status", 1)->where("jatuh_tempo", false);
            $d->update([
                "jatuh_tempo" => true
            ]);
        }
    }

    public function scopeSppSiswa(Builder $query)
    {
        $date = Carbon::now();
        $siswa = Siswa::all();

        if ($date->month >= 7) {
            $periode = Periode::where("tahun_pertama", $date->year)->where("bulan", $date->monthName)->first();
        } else {
            $periode = Periode::where("tahun_kedua", $date->year)->where("bulan", $date->monthName)->first();
        }

        $data = [];
        $d = Spp::where("id_periode", $periode->id)->get()->groupBy("id_status");

        $d1 = $d["1"]->count();
        $d2 = 0;
        if ($d->has("2")) {
            $d2 = $d["2"]->count();
        }

        if ($d1 + $d2 != $siswa->count()) {
            $d1 = $siswa->count() - $d2;
        }

        array_push($data, $d1, $d2);

        return $data;
    }

    public static function spp(Request $request)
    {
        $monthName = $request->query("month");
        $month = Spp::getMonth($monthName);

        if ($month >= 7 && $request->query("year")) {
            $periode = Periode::where("tahun_pertama", $request->query("year"))->where("bulan", $monthName)->get();
        } else {
            $periode = Periode::where("tahun_kedua", $request->query("year"))->where("bulan", $monthName)->get();
        }

        $siswa = Siswa::with("kelas")->get();
        $d = [];
        if ($periode->count() != 0) {
            foreach ($siswa as $key) {
                $res = Spp::where("id_periode", $periode[0]->id)->where("id_siswa", $key->id)->where("id_status", 2)->first();
                $result = $res ? "Lunas" : "Belum Lunas";
                array_push($d, ["status" => $result]);
            }
            $data = ["siswa" => $siswa, "status" => $d];
        } else {
            $data = ["siswa" => null, "status" => null];
        }

        return $data;
    }

    public function siswa()
    {
        return $this->belongsTo(Siswa::class, "id_siswa");
    }

    public function periode()
    {
        return $this->belongsTo(Periode::class, "id_periode");
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class, "id_status");
    }

    public static function getMonth(string $monthName)
    {
        switch ($monthName) {
            case 'Januari':
                $month = 1;
                break;
            case 'Februari':
                $month = 2;
                break;
            case 'Maret':
                $month = 3;
                break;
            case 'April':
                $month = 4;
                break;
            case 'Mei':
                $month = 5;
                break;
            case 'Juni':
                $month = 6;
                break;
            case 'Juli':
                $month = 7;
                break;
            case 'Agustus':
                $month = 8;
                break;
            case 'September':
                $month = 9;
                break;
            case 'Oktober':
                $month = 10;
                break;
            case 'November':
                $month = 11;
                break;
            case 'Desember':
                $month = 12;
                break;
            default:
                $month = 0;
                break;
        }

        return $month;
    }
}
