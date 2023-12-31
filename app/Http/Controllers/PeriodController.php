<?php

namespace App\Http\Controllers;

use App\Models\Periode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeriodController extends Controller
{
    public function index()
    {
        return Inertia::render("Periode", [
            "title" => "Periode",
        ]);
    }

    public function get()
    {
        try {
            $data = Periode::all()->unique("tahun_pertama")->values();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function store(Request $request)
    {
        try {
            Periode::addPeriode($request);

            return response()->json("Periode baru berhasil ditambahkan", 200);
        } catch (\Throwable $th) {
            return response()->json("Periode baru gagal ditambahkan.", 500);
        }
    }

    public function delete(string $id, Periode $periode)
    {
        try {
            $periode->findOrFail($id);
            $periode->delete();

            return response()->json("Periode berhasil dihapus", 200);
        } catch (\Throwable $th) {
            return response()->json("Periode gagal dihapus.", 500);
        }
    }
}
