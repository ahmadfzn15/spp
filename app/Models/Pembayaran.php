<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = "pembayaran";
    protected $guarded = ["id"];

    public function spp()
    {
        return $this->belongsTo(Spp::class, "id_spp");
    }

    public function status()
    {
        return $this->belongsTo(Status::class, "id_status");
    }

    public function scopePembayaran(Builder $query, Request $request)
    {
        $orderBy = $request->query("orderBy") ?? "id";
        $sort = $request->query("sort") ?? "asc";
        $search = $request->query("search");

        if ($request->query("startDate") && $request->query("endDate")) {
            $startDate = Carbon::createFromFormat("Y-m-d", $request->query("startDate"));
            $endDate = Carbon::createFromFormat("Y-m-d", $request->query("endDate"));

            $data = $query->with(['spp', 'spp.siswa', 'status', 'spp.periode', 'spp.siswa.kelas'])->where("id_status", 3)->whereBetween("created_at", [$startDate, $endDate])->orderBy($orderBy, $sort)->get()->groupBy("kode")->values();
        }
        if ($search) {
            $data = $query->with(['spp', 'spp.siswa', 'status', 'spp.periode', 'spp.siswa.kelas'])->where("id_status", 3)->whereRelation("spp.siswa", "nama", "like", "%" . $search . "%")->get()->groupBy("kode")->values();
        }

        $data = $query->with(['spp', 'spp.siswa', 'status', 'spp.periode', 'spp.siswa.kelas'])->where("id_status", 3)->orderBy($orderBy, $sort)->get()->groupBy("kode")->values();

        return $data;
    }
}
