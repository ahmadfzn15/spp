<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Periode;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class SppController extends Controller
{
    public function index()
    {
        $month = Periode::all()->unique("bulan")->values();
        $year = Periode::all();

        $years = [];
        for ($i = $year->first()->tahun_pertama; $i <= $year->last()->tahun_kedua; $i++) {
            array_push($years, $i);
        }
        $periode = ["month" => $month, "year" => $years];

        return Inertia::render("Spp/DataSpp", [
            "title" => "Data Spp",
            "data" => Spp::with(['siswa', 'siswa.kelas', 'periode', "status"])->latest()->get(),
            "periode" => $periode
        ]);
    }

    public function get(Request $request)
    {
        try {
            $data = Spp::spp($request);

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function bayar(Request $request, Siswa $siswa, Pembayaran $pembayaran)
    {
        try {
            $id_siswa = $siswa->where("nis", $request->data["nis"])->first()->id;
            $sppExist = $pembayaran->whereRelation("spp.siswa", "id", $id_siswa)->whereIn("id_spp", $request->data["id"])->get();

            $kd = Str::random(6);
            $checkCode = $pembayaran->where("kode", $kd)->first();

            while ($checkCode) {
                $kd = Str::random(6);
                $checkCode = $pembayaran->where("kode", $kd)->first();
                if ($checkCode) {
                    continue;
                }
            }


            if ($id_siswa > 0) {
                if ($sppExist->count() == 0) {
                    foreach ($request->data["id"] as $key) {
                        $pembayaran = new Pembayaran();

                        $pembayaran->kode = $kd;
                        $pembayaran->id_spp = $key;
                        $pembayaran->metode_pembayaran = "Offline";
                        $pembayaran->id_status = 3;
                        $pembayaran->save();

                        Spp::findOrFail($key)->update([
                            "id_status" => 3,
                        ]);
                    }
                    return response()->json("Pembayaran spp berhasil, harap tunggu konfirmasi admin.", 200);
                } else {
                    return response()->json("Pembayaran spp sedang menunggu konfirmasi admin.", 200);
                }
            }
            return response()->json("Terjadi kesalahan!", 500);
        } catch (\Throwable $th) {
            return response()->json("Terdapat kesalahan teknis", 500);
        }
    }
}
