<?php

namespace App\Http\Controllers;

use App\Models\History;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $pembayaran = History::history();

        return Inertia::render("History", [
            "title" => "History",
            "data" => $pembayaran
        ]);
    }

    public function get(History $history)
    {
        try {
            if (auth()->user()->role == "admin") {
                $data = $history->latest()->get();

                return response()->json($data, 200);
            } else {
                $data = $history->where("")->latest()->first();

                return response()->json($data, 200);
            }
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function test()
    {
        $data = Inertia::render("Kwitansi");
        $html = $data->toResponse(request())->getContent();

        $pdf = new Dompdf();
        $pdf->loadHtml($html);
        $pdf->setPaper("A4", "portrait");
        $pdf->render();
        $pdfData = $pdf->output();

        return response()->json($html, 200, ["Content-Type" => "application/pdf;charset=utf-8"]);
    }
}
