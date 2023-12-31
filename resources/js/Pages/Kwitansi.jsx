import moment from "moment";
import { useEffect } from "react";

export default function Kwitansi({ data }) {
    useEffect(() => {
        if (route().current("kwitansi.cetak")) {
            onafterprint = () => {
                history.back();
            };

            print();
        }
    }, []);

    return (
        <>
            <div className="mx-auto font-serif w-full h-full mt-5 px-10">
                <div className="flex gap-5 border-b-4 border-black">
                    <img src="/img/logo.png" alt="Logo" className="w-32" />
                    <div className="flex flex-col gap-3 justify-center">
                        <h1 className="text-2xl font-bold">
                            SMK DAARUL ABROOR
                        </h1>
                        <p>
                            kp.Cibereum, ds.Cikadu, kec.Cisayong,
                            kab.Tasikmalaya
                        </p>
                    </div>
                </div>
                <div className="my-3 space-y-3 h-full flex flex-col justify-between">
                    <div className="grid grid-cols-2 w-3/4 py-2">
                        <table className="w-min">
                            <tr className="whitespace-nowrap ">
                                <td>Tahun Ajaran</td>
                                <td className="pl-5">: 2023/2024</td>
                            </tr>
                            <tr className="whitespace-nowrap ">
                                <td>Kode Pembayaran</td>
                                <td className="pl-5">
                                    : {data && data[0].kode}
                                </td>
                            </tr>
                            <tr className="whitespace-nowrap ">
                                <td>Tanggal Bayar</td>
                                <td className="pl-5">
                                    :{" "}
                                    {data &&
                                        moment(data[0].created_at).format(
                                            "DD MMMM YYYY"
                                        )}
                                </td>
                            </tr>
                        </table>
                        <table className="w-min">
                            <tr className="whitespace-nowrap ">
                                <td>Nis</td>
                                <td className="pl-5">
                                    : {data && data[0].siswa.nis}
                                </td>
                            </tr>
                            <tr className="whitespace-nowrap ">
                                <td>Nama Siswa</td>
                                <td className="pl-5">
                                    : {data && data[0].siswa.nama}
                                </td>
                            </tr>
                            <tr className="whitespace-nowrap ">
                                <td>Kelas</td>
                                <td className="pl-5">
                                    : {data && data[0].siswa.kelas.kelas}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className="">
                        <table className="w-full mx-auto">
                            <thead>
                                <tr className="border-y-2 border-slate-700 text-xl">
                                    <th className="text-start px-4 py-1 w-10">
                                        No
                                    </th>
                                    <th className="text-start px-4 py-1">
                                        Jenis Pembayaran
                                    </th>
                                    <th className="text-start px-4 py-1">
                                        Periode
                                    </th>
                                    <th className="text-start px-4 py-1">
                                        Biaya
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data[1]?.map((item, i) => (
                                        <tr key={i}>
                                            <td className="px-4 py-1">
                                                {i + 1}.
                                            </td>
                                            <td className="px-4 py-1">Spp</td>
                                            <td className="px-4 py-1">
                                                {item.spp.periode.bulan +
                                                    " " +
                                                    item.spp.periode
                                                        .tahun_pertama +
                                                    "/" +
                                                    item.spp.periode
                                                        .tahun_kedua}
                                            </td>
                                            <td className="px-4 py-1">
                                                {"Rp." +
                                                    item.spp.jumlah_bayar
                                                        .toString()
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            "."
                                                        )}
                                            </td>
                                        </tr>
                                    ))}
                                <tr className="border-t-2 border-slate-700">
                                    <td className="px-4 py-1 text-xl font-semibold whitespace-nowrap">
                                        Terbilang :
                                    </td>
                                    <td className="py-1 text-lg italic whitespace-nowrap capitalize">
                                        {data[0].nominal}
                                    </td>
                                    <td className="text-end px-4 py-1 border-b-2 border-slate-700  text-xl font-semibold">
                                        Total Bayar :
                                    </td>
                                    <td className="px-4 py-1 border-b-2 border-slate-700">
                                        {data &&
                                            "Rp." +
                                                data[0].jumlah_bayar
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        "."
                                                    )}
                                    </td>
                                </tr>
                                <tr></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end pr-28 pt-5">
                        <div className="text-center">
                            <h1>Tasikmalaya,9 Desember 2023</h1>
                            <h1>Petugas</h1>
                            <br />
                            <br />
                            <br />
                            <h1>Ai Yulianti,SE</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
