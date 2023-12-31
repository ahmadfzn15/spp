<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        return Inertia::render("Tagihan", [
            "title" => "Tagihan",
        ]);
    }

    public function show($id, Spp $spp)
    {
        if (Gate::authorize("siswa")) {
            $dataSpp = $spp->with(["periode", "siswa"])->where("id", $id)->first();
        } else {
            $dataSpp = [];
        }

        return Inertia::render("Pembayaran", [
            "title" => "Pembayaran Spp",
            "datas" => $dataSpp
        ]);
    }

    public function get(Siswa $siswa)
    {
        try {
            $check = auth()->user()->role == "siswa";
            if ($check) {
                $id = $siswa->where("nis", auth()->user()->nis)->first()->id;
            }

            $data = Spp::with(["siswa", "siswa.kelas", "periode", "status"])->where("id_siswa", $id)->get();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }
}
