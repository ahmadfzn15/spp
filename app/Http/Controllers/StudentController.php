<?php

namespace App\Http\Controllers;

use App\Exports\SiswaExport;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class StudentController extends Controller
{
    public function index()
    {
        return Inertia::render("Siswa/DataSiswa", [
            "data" => Siswa::with("kelas")->orderBy("nama", "asc")->get(),
            "kelas" => Kelas::all()
        ]);
    }

    public function store(Request $request)
    {
        // $validated = $request->data->validate([
        //     "nama" => "required",
        //     "nis" => "required",
        //     "nisn" => "required",
        //     "kelas" => "required",
        //     "jurusan" => "required",
        //     "jenis_kelamin" => "required",
        //     "tempat_lahir" => "required",
        //     "tanggal_lahir" => "required",
        //     "alamat" => "nullable",
        //     "agama" => "nullable",
        // ]);

        try {
            Siswa::create($request->data);
            User::create([
                "name" => $request->data["nama"],
                "nis" => $request->data["nis"],
                "password" => Hash::make($request->data["password"]),
                "role" => "siswa"
            ]);
            return response()->json("Data baru berhasil ditambahkan.", 200);
        } catch (\Throwable $th) {
            return response()->json("Data gagal ditambahkan", 500);
        }
    }

    public function show($id, Siswa $siswa)
    {
        $spp = Spp::where("id_siswa", base64_decode($id))->get()->groupBy("id_status");
        return $spp;

        return Inertia::render("Siswa/DetailSiswa", [
            "siswa" => $siswa->with(["kelas"])->findOrFail(base64_decode($id)),
            "'spp" => $spp
        ]);
    }

    public function edit(Siswa $siswa)
    {
        return Inertia::render("Siswa/EditSiswa", [
            "title" => "Edit Siswa",
            "siswa" => $siswa,
            "kelas" => Kelas::all()
        ]);
    }

    public function update(string $id, Request $request, Siswa $siswa)
    {
        // $validated = $request->data->validate([
        //     "nama" => "required",
        //     "nis" => "required",
        //     "nisn" => "required",
        //     "id_kelas" => "required",
        //     "jenis_kelamin" => "required",
        //     "tempat_lahir" => "required",
        //     "tanggal_lahir" => "required",
        //     "alamat" => "nullable",
        //     "agama" => "nullable",
        // ]);

        try {
            $siswa->find(base64_decode($id))->update($request->data);
            return response()->json("Data berhasil diedit.", 200);
        } catch (\Throwable $th) {
            return response()->json("Data gagal diedit", 500);
        }
    }

    public function destroy($id, Siswa $siswa)
    {
        try {
            $siswa->findOrFail($id);
            $user = User::findOrFail($id);

            $siswa->delete();
            $user->delete();
            return redirect('/siswa')->with("successDeleteSiswa", "Data berhasil dihapus");
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function get(Request $request, Siswa $siswa)
    {
        try {
            $data = $siswa->search($request);

            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json("Terdapat kesalahan teknis", 500);
        }
    }

    public function delete(Request $request, Siswa $siswa, User $user)
    {
        try {
            foreach ($request->data as $key) {
                $nis = $siswa->findOrFail($key)->nis;
                $siswa->findOrFail($key)->deleteOrFail();
                $user->where("nis", $nis)->delete();
            }

            return response()->json("Data berhasil dihapus.", 200);
        } catch (\Throwable $th) {
            return response()->json("Data gagal dihapus", 500);
        }
    }

    public function downloadJson()
    {

        try {
            $siswa = Siswa::all();
            $data = json_encode($siswa);

            return response($data, 200, ["Content-Type" => "application/json"]);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function downloadPdf()
    {
        try {
            return Excel::download(new SiswaExport, "siswa.pdf", \Maatwebsite\Excel\Excel::DOMPDF);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function downloadExcel()
    {
        try {
            return Excel::download(new SiswaExport, "siswa.xls");
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
