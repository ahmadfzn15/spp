<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Siswa extends Model
{
    use HasFactory;

    protected $table = "siswa";
    protected $guarded = ["id"];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, "id_kelas");
    }

    public function spp()
    {
        return $this->hasMany(Spp::class);
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }

    public function history()
    {
        return $this->hasMany(History::class);
    }

    public function scopeSearch(Builder $query, Request $request)
    {

        $search = $request->query("search");
        $sortBy = $request->query("sortBy");
        $sort = $request->query("sort") ?? "asc";
        $per_page = $request->query("per_page") ?? 20;

        $data = Siswa::with("kelas")->orderBy("nama", $sort)->paginate($per_page);
        if ($request->query("search")) {
            $data = $query->with("kelas")->where("nama", "like", "%" . $search . "%")->orWhere("nis", "like", "%" . $search . "%")->orWhere("nisn", "like", "%" . $search . "%")->paginate($per_page);
        }

        if ($request->query("sortBy")) {
            switch ($sortBy) {
                case 'Nama':
                    $order = 'nama';
                    break;
                case 'Nis':
                    $order = 'nis';
                    break;
                case 'Nisn':
                    $order = 'nisn';
                    break;
                case 'Kelas':
                    $order = 'kelas';
                    break;
                case 'Jenis Kelamin':
                    $order = 'jenis_kelamin';
                    break;
                case 'Tempat Lahir':
                    $order = 'tempat_lahir';
                    break;
                case 'Tanggal Lahir':
                    $order = 'tanggal_lahir';
                    break;
                case 'Alamat':
                    $order = 'alamat';
                    break;
                case 'Agama':
                    $order = 'agama';
                    break;
                default:
                    $order = '';
                    break;
            }

            $data = $query->with("kelas")->orderBy($order, $sort)->paginate($per_page);
        }

        return $data;
    }
}
