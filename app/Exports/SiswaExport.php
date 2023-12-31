<?php

namespace App\Exports;

use App\Models\Siswa;
use Illuminate\Support\Collection as SupportCollection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SiswaExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection(): SupportCollection
    {
        return Siswa::all()->except(['created_at', 'updated_at']);
    }

    public function headings(): array
    {
        return [
            'No',
            'Nama Siswa',
            'Nis',
            'Nisn',
            'ID Kelas',
            'Jenis Kelamin',
            'Tempat Lahir',
            'Tanggal Lahir',
            'Alamat',
            'Agama'
        ];
    }
}
