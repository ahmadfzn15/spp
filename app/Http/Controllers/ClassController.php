<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        return Inertia::render("Kelas", [
            "title" => "Kelas",
            "datas" => Kelas::orderBy("kelas", "asc")->get()
        ]);
    }

    public function get(Kelas $kelas)
    {
        try {
            $data = $kelas->latest()->get();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function store(Request $request, Kelas $kelas)
    {
        try {
            $request->validate([
                "kelas" => "required|unique:kelas,kelas"
            ]);

            $kelas->create([
                "kelas" => $request->kelas
            ]);

            return response()->json("Kelas baru berhasil ditambahkan", 200);
        } catch (\Throwable $th) {
            return response()->json("Kelas baru gagal ditambahkan.", 500);
        }
    }

    public function delete($id, Kelas $kelas)
    {
        try {
            $kelas->findOrFail($id)->deleteOrFail();

            return response()->json("Kelas berhasil dihapus", 200);
        } catch (\Throwable $th) {
            return response()->json("Kelas gagal dihapus.", 500);
        }
    }
}
