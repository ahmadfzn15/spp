<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Tabungan extends Model
{
    use HasFactory;

    protected $table = 'tabungan';
    protected $guarded = ['id'];

    public function scopePemasukanToday($query)
    {
        $data = $query->whereDate("created_at", Carbon::today())->get();

        $pemasukan = 0;
        foreach ($data as $key) {
            $pemasukan += $key->pemasukan;
        }

        return $pemasukan;
    }

    public function scopePemasukanMonth($query)
    {
        $data = $query->whereBetween("created_at", [Carbon::today()->startOfMonth(), Carbon::now()->endOfMonth()])->get();

        $pemasukan = 0;
        foreach ($data as $key) {
            $pemasukan += $key->pemasukan;
        }

        return $pemasukan;
    }

    public function scopeSaldo($query)
    {
        $data = $query->latest()->first();

        return $data;
    }

    public function scopePemasukanYear($query)
    {
        $data = $query->whereBetween("created_at", [Carbon::today()->startOfYear(), Carbon::now()->endOfYear()])->get();

        $pemasukan = 0;
        foreach ($data as $key) {
            $pemasukan += $key->pemasukan;
        }

        return $pemasukan;
    }

    public function scopePemasukanJanuari($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(1))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanFebruari($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(2))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanMaret($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(3))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanApril($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(4))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanMei($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(5))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanJuni($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(6))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanJuli($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(7))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanAgustus($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(8))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanSeptember($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(9))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanOktober($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(10))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanNovember($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(11))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }

    public function scopePemasukanDesember($query)
    {
        $result = 0;

        $array = $query->whereMonth("created_at", Carbon::now()->month(12))->get();

        foreach ($array as $key) {
            $result += $key->pemasukan;
        }

        return $result;
    }
}
