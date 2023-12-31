<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelas;
use App\Models\Periode;
use App\Models\Setting;
use App\Models\Siswa;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $months = [
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
        ];

        $kelas = [
            "X RPL",
            "X TKRO",
            "X TBSM",
            "X OTKP",
            "XI RPL 1",
            "XI RPL 2",
            "XI TKRO",
            "XI TBSM",
            "XI OTKP",
            "XII RPL 1",
            "XII RPL 2",
            "XII TKRO",
            "XII TBSM",
            "XII OTKP"
        ];

        $siswa = [
            [
                "nama" => "ADELIA RAMADANI",
                "nis" => "21221312",
                "nisn" => "005612001",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Karang Mulia",
                "tanggal_lahir" => "2007-02-28",
                "alamat" => "",
                "agama" => "Islam"
            ],
            [
                "nama" => "AGUS IRVAN",
                "nis" => "21221313",
                "nisn" => "005612002",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-08-19",
                "alamat" => "Kp.Cinusa Hilir",
                "agama" => "Islam"
            ],
            [
                "nama" => "AHMAD FAUZAN",
                "nis" => "21221314",
                "nisn" => "005612003",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-08-15",
                "alamat" => "Kp.Cinusa Girang",
                "agama" => "Islam"
            ],
            [
                "nama" => "AI DINAR",
                "nis" => "21221315",
                "nisn" => "005612004",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-04-14",
                "alamat" => "Kp.Kiara Payung",
                "agama" => "Islam"
            ],
            [
                "nama" => "ALIKA SAGARA NUR RIKJAN",
                "nis" => "21221316",
                "nisn" => "005612005",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-03-04",
                "alamat" => "Kp.Cikadu",
                "agama" => "Islam"
            ],
            [
                "nama" => "ALPON ANDRIANSYAH",
                "nis" => "21221317",
                "nisn" => "005612006",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-02-09",
                "alamat" => "Kp.Sindang Tanjung",
                "agama" => "Islam"
            ],
            [
                "nama" => "AZIZ FATUROHMAN",
                "nis" => "21221318",
                "nisn" => "005612007",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-06-02",
                "alamat" => "Kp.Tekahurip",
                "agama" => "Islam"
            ],
            [
                "nama" => "DELA CITRA PITRIANTI",
                "nis" => "21221319",
                "nisn" => "005612008",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-05-06",
                "alamat" => "Kp.Tekahurip",
                "agama" => "Islam"
            ],
            [
                "nama" => "DIKI PERMANA",
                "nis" => "21221320",
                "nisn" => "005612009",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-06-17",
                "alamat" => "Kp.Kicau",
                "agama" => "Islam"
            ],
            [
                "nama" => "DIKRI ARIA CIPTA NUGRAHA",
                "nis" => "21221321",
                "nisn" => "005612010",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-04-01",
                "alamat" => "Kp.Cigorowong",
                "agama" => "Islam"
            ],
            [
                "nama" => "ESTI TRI UTAMI",
                "nis" => "21221322",
                "nisn" => "005612011",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-02-09",
                "alamat" => "Kp.Cinusa Hilir",
                "agama" => "Islam"
            ],
            [
                "nama" => "FAHMI KAHFIAN",
                "nis" => "21221323",
                "nisn" => "005612012",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-07-03",
                "alamat" => "Kp.Cicadas",
                "agama" => "Islam"
            ],
            [
                "nama" => "FARRAS NUR INTAN LESTARI",
                "nis" => "21221324",
                "nisn" => "005612013",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Bandung",
                "tanggal_lahir" => "2006-08-25",
                "alamat" => "Kp.Kerenceng",
                "agama" => "Islam"
            ],
            [
                "nama" => "FILBAS HABIBUS SIDIK",
                "nis" => "21221325",
                "nisn" => "005612014",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Ciamis",
                "tanggal_lahir" => "2006-02-12",
                "alamat" => "Kp.Cigorowong",
                "agama" => "Islam"
            ],
            [
                "nama" => "IMAM NURHAKIM ARBI",
                "nis" => "21221326",
                "nisn" => "005612015",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-09-30",
                "alamat" => "Kp.Cinusa Girang",
                "agama" => "Islam"
            ],
            [
                "nama" => "LUSI KURAISIN",
                "nis" => "21221327",
                "nisn" => "005612016",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-08-25",
                "alamat" => "Kp.Sanding Timur",
                "agama" => "Islam"
            ],
            [
                "nama" => "MOHAMAD BINTANG PAMUNGKAS",
                "nis" => "21221328",
                "nisn" => "005612017",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-09-29",
                "alamat" => "Kp.Kerenceng",
                "agama" => "Islam"
            ],
            [
                "nama" => "MUHAMMAD ABDUL JALIL",
                "nis" => "21221329",
                "nisn" => "005612018",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-05-09",
                "alamat" => "Kp.Cibodas Oncom",
                "agama" => "Islam"
            ],
            [
                "nama" => "NABILA FAUZIAH",
                "nis" => "21221330",
                "nisn" => "005612019",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-12-21",
                "alamat" => "Kp.Parakan Kawung",
                "agama" => "Islam"
            ],
            [
                "nama" => "RAFI ROFIANA",
                "nis" => "21221331",
                "nisn" => "005612020",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tabanan",
                "tanggal_lahir" => "2005-11-14",
                "alamat" => "Kp.Langen sari",
                "agama" => "Islam"
            ],
            [
                "nama" => "RIEZKA ADHELIA PUTRI",
                "nis" => "21221332",
                "nisn" => "005612021",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Bandung",
                "tanggal_lahir" => "2006-03-13",
                "alamat" => "Kp.Nangela",
                "agama" => "Islam"
            ],
            [
                "nama" => "RIFKI FIRMANSYAH",
                "nis" => "21221333",
                "nisn" => "005612022",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-07-07",
                "alamat" => "Kp.Cinusa Girang",
                "agama" => "Islam"
            ],
            [
                "nama" => "RISKI ALFARIZI",
                "nis" => "21221334",
                "nisn" => "005612023",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-05-27",
                "alamat" => "Kp.Nagarawangi",
                "agama" => "Islam"
            ],
            [
                "nama" => "RISWAN NUGRAHA",
                "nis" => "21221335",
                "nisn" => "005612024",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-08-15",
                "alamat" => "Kp.Jantake",
                "agama" => "Islam"
            ],
            [
                "nama" => "RIZKI RIDAN MAULANA",
                "nis" => "21221342",
                "nisn" => "005612025",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "",
                "tanggal_lahir" => null,
                "alamat" => "",
                "agama" => "Islam"
            ],
            [
                "nama" => "ROBY HANDAYA",
                "nis" => "21221336",
                "nisn" => "005612026",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-07-22",
                "alamat" => "Kp.Cinusa Girang",
                "agama" => "Islam"
            ],
            [
                "nama" => "SALWA NOVIYANTI",
                "nis" => "21221337",
                "nisn" => "005612027",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-11-23",
                "alamat" => "Kp.Ciburuy",
                "agama" => "Islam"
            ],
            [
                "nama" => "SRI DEWI",
                "nis" => "21221343",
                "nisn" => "005612028",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "",
                "tanggal_lahir" => null,
                "alamat" => "Kp.Sindangreret",
                "agama" => "Islam"
            ],
            [
                "nama" => "SITI NUR ASIYAH",
                "nis" => "21221338",
                "nisn" => "005612029",
                "id_kelas" => "10",
                "jenis_kelamin" => "Perempuan",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-12-22",
                "alamat" => "Kp.Cicadas",
                "agama" => "Islam"
            ],
            [
                "nama" => "TARLAN FEBRIANA",
                "nis" => "21221339",
                "nisn" => "005612030",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-02-08",
                "alamat" => "Kp.Tekahurip",
                "agama" => "Islam"
            ],
            [
                "nama" => "TOFAN MAULANA",
                "nis" => "21221340",
                "nisn" => "005612031",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2005-05-01",
                "alamat" => "Kp.Cinusa Hilir",
                "agama" => "Islam"
            ],
            [
                "nama" => "YUSUF MAULANA",
                "nis" => "21221341",
                "nisn" => "005612032",
                "id_kelas" => "10",
                "jenis_kelamin" => "Laki-laki",
                "tempat_lahir" => "Tasikmalaya",
                "tanggal_lahir" => "2006-03-28",
                "alamat" => "Kp.Cigebay",
                "agama" => "Islam"
            ]
        ];


        // Seeder data periode
        foreach ($months as $key) {
            Periode::create([
                "bulan" => $key,
                "tahun_pertama" => 2021,
                "tahun_kedua" => 2022
            ]);
        }
        foreach ($months as $key) {
            Periode::create([
                "bulan" => $key,
                "tahun_pertama" => 2022,
                "tahun_kedua" => 2023
            ]);
        }
        foreach ($months as $key) {
            Periode::create([
                "bulan" => $key,
                "tahun_pertama" => 2023,
                "tahun_kedua" => 2024
            ]);
        }

        // Seeder data kelas
        foreach ($kelas as $key) {
            Kelas::create([
                "kelas" => $key
            ]);
        }

        // Seeder data User
        User::create([
            "username" => "admin1",
            "password" => Hash::make("123123123"),
            "role" => "admin"
        ]);
        User::create([
            "username" => "admin2",
            "password" => Hash::make("321321321"),
            "role" => "admin"
        ]);

        foreach ($siswa as $key) {
            User::create([
                "name" => $key["nama"],
                "nis" => $key["nis"],
                "password" => Hash::make("123123123"),
                "role" => "siswa"
            ]);
        }

        // Seeder data Siswa
        foreach ($siswa as $key) {
            Siswa::create([
                "nama" => $key["nama"],
                "nis" => $key["nis"],
                "nisn" => $key["nisn"],
                "id_kelas" => $key["id_kelas"],
                "jenis_kelamin" => $key["jenis_kelamin"],
                "tempat_lahir" => $key["tempat_lahir"],
                "tanggal_lahir" => $key["tanggal_lahir"],
                "alamat" => $key["alamat"],
                "agama" => $key["agama"],
            ]);
        }

        $status = [
            "Belum Lunas",
            "Lunas",
            "Menunggu dikonfirmasi",
            "Dikonfirmasi",
        ];

        foreach ($status as $key) {
            Status::create([
                "status" => $key
            ]);
        }

        Setting::create([
            "logo" => null,
            "nama_instansi" => "SMK DA",
            "slogan" => "Abroor Kahiji",
            "email" => "smkdaarulabroor@gmail.com",
            "no_telepon" => "081287999762",
            "alamat" => "kp.Cibereum, ds.Cikadu, kec.Cisayong, kab.Tasikmalaya",
            "copyright" => "Copyright © 2023 SMK DAARUL ABROOR",
            "biaya_spp" => 70000
        ]);
    }
}
