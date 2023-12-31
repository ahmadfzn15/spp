import Layout from "@/Layouts/Layout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";

export default function Help({ auth, title }) {
    return (
        <>
            <Head title={title} />
            <Layout auth={auth}>
                <Card className="mt-5">
                    <CardHeader className="py-3 px-5" color="blue">
                        <Typography variant="h4">Panduan</Typography>
                    </CardHeader>
                    <CardBody>
                        <Typography
                            variant="h4"
                            className="text-slate-800 font-thin"
                        >
                            Petunjuk Penggunaan Aplikasi
                        </Typography>
                        <Typography variant="paragraph">
                            Aplikasi ini adalah aplikasi khusus pembayaran SPP,
                            dimana aplikasi ini mengakomodasi pembayaran SPP
                            disekolah. Pembayaran SPP dilakukan berdasarkan
                            jumlah nominal pembayaran yang harus dilunasi siswa
                            dalam satu tahun pelajaran. Aplikasi ini
                            memperbolehkan perbedaan jumlah nominal uang
                            Pembayaran SPP setiap kelas per tahun pelajarannya.
                            Berikut petunjuk penggunaannya untuk anda sebagai
                            Siswa :
                        </Typography>
                        <div className="ml-8 my-5">
                            <Typography variant="h6" className="text-slate-800">
                                1.Ganti Password Anda
                            </Typography>
                            <Typography variant="paragraph">
                                Jika anda pertama kali menggunakan aplikasi ini,
                                silahkan segera ganti password anda.
                            </Typography>
                            <Typography variant="h6" className="text-slate-800">
                                2.Lakukan Pembayaran
                            </Typography>
                            <Typography variant="paragraph">
                                Sebagai siswa anda hanya dapat melihat histori
                                pembayaran SPP anda selama anda bersekolah
                                disekolah ini. Untuk melakukan pembayaran SPP
                                anda dapat langsung membayarnya ke Petugas
                                Pembayaran SPP disekolah, data pembayaran SPP
                                anda akan di input oleh petugas Pembayaran
                            </Typography>
                            <Typography variant="h6" className="text-slate-800">
                                3.Histori Pembayaran
                            </Typography>
                            <Typography variant="paragraph">
                                Menu histori pembayaran berisi riwayat transaksi
                                pembayaran yang telah di lakukan, Disini anda
                                hanya dapat melihat riwayat transaksi yang anda
                                lakukan, transaksi yang dilakukan oleh user lain
                                tidak akan dapat anda lihat.
                            </Typography>
                        </div>
                        <Typography
                            variant="h4"
                            className="text-slate-800 font-thin"
                        >
                            Hak Akses Aplikasi
                        </Typography>
                        <Typography variant="paragraph">
                            Dalam Aplikasi Pembayaran SPP ini anda mendapatkan
                            hak Akses hanya sebagai Siswa.
                        </Typography>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
