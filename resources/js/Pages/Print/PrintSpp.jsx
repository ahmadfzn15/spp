import { useEffect } from "react";

export default function PrintSpp({ data, kelas }) {
    useEffect(() => {
        print();
    }, []);
    return (
        <>
            <div className="">
                <h1 className="text-2xl m-5">Data Siswa</h1>
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                            <th className="py-2 px-4 whitespace-nowrap">No</th>
                            <th className="py-2 px-4 whitespace-nowrap">
                                Nama
                            </th>
                            <th className="py-2 px-4 whitespace-nowrap">Nis</th>
                            <th className="py-2 px-4 whitespace-nowrap">
                                Nisn
                            </th>
                            <th className="py-2 px-4 whitespace-nowrap">
                                Kelas
                            </th>
                            <th className="py-2 px-4 whitespace-nowrap">
                                Jenis Kelamin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length != 0 ? (
                            data?.map((d, i) => (
                                <tr
                                    key={i}
                                    className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                >
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {i + 1}.
                                    </td>
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {d.nama}
                                    </td>
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {d.nis}
                                    </td>
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {d.nisn}
                                    </td>
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {
                                            kelas.find(
                                                (res) => res.id == d.id_kelas
                                            ).kelas
                                        }
                                    </td>
                                    <td className="py-1 px-4 whitespace-nowrap">
                                        {d.jenis_kelamin}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                <td
                                    className="py-1 px-4 whitespace-nowrap"
                                    colSpan="10"
                                >
                                    Data siswa kosong
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
