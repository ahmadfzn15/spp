<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\Tabungan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagesController extends Controller
{

    public function DashboardAdmin()
    {
        if (auth()->user()->role == "admin") {
            $allBulan = [
                Tabungan::pemasukanJanuari(),
                Tabungan::pemasukanFebruari(),
                Tabungan::pemasukanMaret(),
                Tabungan::pemasukanApril(),
                Tabungan::pemasukanMei(),
                Tabungan::pemasukanJuni(),
                Tabungan::pemasukanJuli(),
                Tabungan::pemasukanAgustus(),
                Tabungan::pemasukanSeptember(),
                Tabungan::pemasukanOktober(),
                Tabungan::pemasukanNovember(),
                Tabungan::pemasukanDesember(),
            ];

            $data = [
                Tabungan::pemasukanToday(),
                Tabungan::pemasukanMonth(),
                Tabungan::saldo(),
                $allBulan,
                Spp::sppSiswa()
            ];

            return Inertia::render('DashboardAdmin', [
                'title' => "DashboardAdmin",
                'siswa' => Siswa::latest()->get(),
                'data' => $data
            ]);
        } else {
            return Inertia::render("DashboardSiswa", [
                "title" => "DashboardSiswa",
                "data" => History::with(["siswa.kelas"])->latest()->first()
            ]);
        }
    }

    public function Help()
    {
        return Inertia::render("Help", [
            "title" => "Help"
        ]);
    }

    public function Tabungan()
    {
        $data = Tabungan::all();

        return Inertia::render("Tabungan", [
            "title" => "Tabungan",
            "data" => $data
        ]);
    }

    public function Setting()
    {
        return Inertia::render("Setting", [
            "title" => "Setting"
        ]);
    }
}
