import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
} from "@material-tailwind/react";
import { HiChevronLeft } from "react-icons/hi2";

export default function DetailSiswa({ auth, title, siswa }) {
    return (
        <>
            <Head title={siswa.nama} />
            <Layout auth={auth}>
                <Card className="mt-5">
                    <CardHeader
                        color="blue"
                        className="px-5 py-4 flex items-center gap-2"
                        variant="gradient"
                    >
                        <Link href={route("siswa.index")}>
                            <IconButton variant="text" size="sm">
                                <HiChevronLeft className="w-6 h-6 text-white" />
                            </IconButton>
                        </Link>
                        <h1 className="text-white text-xl font-semibold">
                            {title}
                        </h1>
                    </CardHeader>
                    <CardBody>
                        <table>
                            <tr>
                                <td>Nama</td>
                                <td className="pl-10">: {siswa.nama ?? "-"}</td>
                            </tr>
                            <tr>
                                <td>Nis</td>
                                <td className="pl-10">: {siswa.nis ?? "-"}</td>
                            </tr>
                            <tr>
                                <td>Nisn</td>
                                <td className="pl-10">: {siswa.nisn ?? "-"}</td>
                            </tr>
                            <tr>
                                <td>Kelas</td>
                                <td className="pl-10">
                                    : {siswa.kelas.kelas ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <td>Jenis Kelamin</td>
                                <td className="pl-10">
                                    : {siswa.jenis_kelamin ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <td>Tempat Lahir</td>
                                <td className="pl-10">
                                    : {siswa.tempat_lahir ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <td>Tanggal Lahir</td>
                                <td className="pl-10">
                                    : {siswa.tanggal_lahir ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td className="pl-10">
                                    : {siswa.alamat ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <td>Agama</td>
                                <td className="pl-10">
                                    : {siswa.agama ?? "-"}
                                </td>
                            </tr>
                        </table>
                    </CardBody>
                    <CardFooter divider></CardFooter>
                </Card>
            </Layout>
        </>
    );
}
