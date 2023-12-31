import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import tabungan from "@/utils/tabungan";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Spinner,
} from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Tabungan({ auth, title, data }) {
    const card = useRef(null);
    const { color } = useSetting();

    useEffect(() => {
        gsap.from(card.current, {
            y: 40,
            duration: 0.5,
            opacity: 0,
        });
    }, []);
    return (
        <>
            <Head title={title} />
            <Layout auth={auth}>
                <Card className="mt-5 shadow-lg" ref={card}>
                    <CardHeader color={color} className="px-5 py-4">
                        <Typography variant="h5">Tabungan Sekolah</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full space-y-4">
                            <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                            {tabungan.map((d, i) => (
                                                <th
                                                    key={i}
                                                    className="py-2 px-4 whitespace-nowrap"
                                                >
                                                    {d.th}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data ? (
                                            data.length != 0 ? (
                                                data.map((d, i) => (
                                                    <tr
                                                        key={i}
                                                        className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                                    >
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {i + 1}.
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {"Rp." +
                                                                d.pemasukan
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        "."
                                                                    )}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {"Rp." +
                                                                d.saldo
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        "."
                                                                    )}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {d.ket}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        Data Tabungan Kosong
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                <td
                                                    className="py-2 px-4 whitespace-nowrap"
                                                    colSpan="10"
                                                >
                                                    <Spinner
                                                        color="blue"
                                                        className="w-32 h-32 mx-auto my-10"
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
