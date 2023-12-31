import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { TbMoodEmpty } from "react-icons/tb";

export default function DashboardSiswa({ data, auth }) {
    const card = useRef(null);

    useEffect(() => {
        gsap.from(card.current, {
            y: 30,
            duration: 0.5,
            opacity: 0,
        });
    }, []);
    return (
        <>
            <Head title="Dashboard" />
            <Layout auth={auth}>
                <Card ref={card}>
                    <CardBody>
                        {data ? (
                            <div className="space-y-2">
                                <Typography variant="h5">
                                    Pembayaran Terakhir Anda
                                </Typography>
                                <h1>Berikut data transaksi terakhir anda.</h1>
                                <div className="overflow-x-auto max-h-[25rem] w-min rounded-lg ring-2 ring-slate-300 table-siswa">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Periode
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Kelas
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Status
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Jumlah Bayar
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data && (
                                                <tr className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300">
                                                    <td className="py-2 px-4 whitespace-nowrap">
                                                        {data.periode}
                                                    </td>
                                                    <td className="py-2 px-4 whitespace-nowrap">
                                                        {data.siswa.kelas.kelas}
                                                    </td>
                                                    <td className="py-2 px-4 whitespace-nowrap">
                                                        {data.status}
                                                    </td>
                                                    <td className="py-2 px-4 whitespace-nowrap">
                                                        {data.jumlah_bayar}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <h1 className="text-xl flex items-center gap-2 justify-center">
                                <TbMoodEmpty className="w-7 h-7" />
                                Anda belum melakukan transaksi apapun.
                            </h1>
                        )}
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
