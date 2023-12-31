<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Pembayaran;
use App\Models\Periode;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\Tabungan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        $periode = [
            Periode::orderBy("tahun_pertama", "asc")->first(),
            Periode::orderBy("tahun_kedua", "desc")->first(),
        ];

        return Inertia::render("Spp/Pembayaran", [
            "title" => "Pembayaran Spp",
            "data" => Spp::with(['siswa', 'siswa.kelas', 'periode', "status"])->latest()->get(),
            "periode" => $periode
        ]);
    }

    public function get(Request $request)
    {
        DB::beginTransaction();

        try {
            $data = Pembayaran::pembayaran($request);

            DB::commit();
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function confirm(Request $request, Pembayaran $pembayaran, Tabungan $tabungan, History $history, Siswa $siswa, User $user)
    {
        DB::beginTransaction();

        try {
            $total_pemasukan = "0";
            foreach ($request->data as $item) {
                $jumlah_bayar = "0";
                $periode = [];
                $pmbyrn = $pembayaran->with("spp")->findOrFail($item[0]);
                $dataSiswa = $siswa->findOrFail($pmbyrn->spp->id_siswa);
                foreach ($item as $key) {
                    $d = $pembayaran->with("spp", "spp.periode")->findOrFail($key);
                    if ($d->id_status == 3) {
                        $d->update([
                            "id_status" => 4
                        ]);
                        $d->spp->update([
                            "id_status" => 2
                        ]);

                        $jumlah_bayar += $d->spp->jumlah_bayar;
                        array_push($periode, $d->spp->periode->bulan . " " . $d->spp->periode->tahun_pertama . "/" . $d->spp->periode->tahun_kedua);
                    }
                }

                $total_pemasukan += $jumlah_bayar;

                $periodeNew = count($periode) == 1 ? $periode[0] : $periode[0] . " - " . $periode[count($periode) - 1];

                $history->create([
                    "kode" => $pmbyrn->kode,
                    "id_siswa" => $dataSiswa->id,
                    "periode" => $periodeNew,
                    "status" => "Lunas",
                    "jumlah_bayar" => $jumlah_bayar,
                    "nama_petugas" => auth()->user()->username,
                ]);
            }

            $saldo = $tabungan->latest()->first()->saldo ?? 0;
            $tabungan->create([
                "pemasukan" => $total_pemasukan,
                "saldo" => $saldo + $total_pemasukan,
                "ket" => "Bayar SPP"
            ]);

            DB::commit();
            return response()->json("Permintaan berhasil dikonfirmasi", 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json("Terdapat kesalahan teknis", 500);
        }
    }

    public function belumLunas()
    {
        try {
            $data = Pembayaran::where("id_status", 3)->get()->unique("kode")->count();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }
}
