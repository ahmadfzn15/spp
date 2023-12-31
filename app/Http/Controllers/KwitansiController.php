<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use NumberFormatter;

class KwitansiController extends Controller
{
    public function index(string $id)
    {
        $data = $this->getData($id);
        return Inertia::render("DetailKwitansi", [
            "title" => "Kwitansi",
            "data" => $data,
        ]);
    }

    public function Kwitansi(string $idEncoded)
    {
        $data = $this->getData($idEncoded);
        return Inertia::render("Kwitansi", [
            "title" => "Kwitansi",
            "data" => $data
        ]);
    }

    public function getData(string $idEncoded)
    {
        $decodedId = base64_decode($idEncoded);
        list($a, $b, $id) = explode("_", $decodedId);

        $history = History::with("siswa", "siswa.kelas")->findOrFail($id);

        $formatter = new NumberFormatter('id-ID', NumberFormatter::SPELLOUT);
        $history->nominal = $formatter->format($history->jumlah_bayar) . " Rupiah";
        $link = base64_encode($history->siswa->nis . '_' . $history->kode . '_' . $history->id);

        $pembayaran = Pembayaran::where("kode", $history->kode)
            ->with("spp", "spp.periode")
            ->get();

        return [
            $history,
            $pembayaran,
            $link
        ];
    }
}
