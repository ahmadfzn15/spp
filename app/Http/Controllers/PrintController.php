<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrintController extends Controller
{
    public function report()
    {
        return Inertia::render("Print/PrintSiswa", [
            "data" => Siswa::orderBy("nama", "asc")->get(),
            "kelas" => Kelas::all()
        ]);
    }
}
