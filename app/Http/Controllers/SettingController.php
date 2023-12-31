<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function get()
    {
        try {
            $data = Setting::first();

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }

    public function edit(Request $request, Setting $setting)
    {
        try {
            $setting->find(1)->update($request);

            return response()->json("Profil sekolah berhasil di update.", 200);
        } catch (\Throwable $th) {
            return response()->json("Terjadi kesalahan teknis.", 500);
        }
    }
}
