import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    IconButton,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Spinner,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { HiBars3, HiEye } from "react-icons/hi2";
import Kwitansi from "./Kwitansi";
import { MdCheckBox } from "react-icons/md";
import { BsPrinterFill } from "react-icons/bs";

export default function History({ auth, title, data }) {
    const card = useRef(null);
    const [dialogKwitansi, setDialogKwitansi] = useState(false);
    const { color } = useSetting();

    const [Thead, setThead] = useState([
        {
            name: "Kode",
            checked: true,
            role: "siswa",
        },
        {
            name: "Nama",
            checked: true,
            role: "admin",
        },
        {
            name: "Nis",
            checked: true,
            role: "admin",
        },
        {
            name: "Kelas",
            checked: true,
            role: "admin",
        },
        {
            name: "Periode",
            checked: true,
            role: "siswa",
        },
        {
            name: "Tanggal Bayar",
            checked: true,
            role: "siswa",
        },
        {
            name: "Status",
            checked: true,
            role: "siswa",
        },
        {
            name: "Jumlah Bayar",
            checked: true,
            role: "siswa",
        },
        {
            name: "Petugas",
            checked: false,
            role: "siswa",
        },
        {
            name: "Opsi",
            checked: true,
            role: "siswa",
        },
    ]);

    const changeThead = (e) => {
        setThead((d) =>
            d.map((item) =>
                item.name == e
                    ? { ...item, checked: !item.checked }
                    : { ...item }
            )
        );
    };

    useEffect(() => {
        const get = async () => {
            // const res = await axios
            //     .get("/api/history/test", { responseType: "blob" })
            //     .then((res) => {
            //         const blob = new Blob([res.data], {
            //             type: "application/pdf",
            //         });
            //         const url = URL.createObjectURL(blob);
            //         const link = document.createElement("a");
            //         link.href = url;
            //         link.download = "Kwitansi.pdf";
            //         link.click();
            //     });
        };

        get();
    }, [dialogKwitansi]);

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
                        <Typography variant="h5">Histori Pembayaran</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full space-y-4">
                            <div className="flex justify-end">
                                <ButtonGroup
                                    size="sm"
                                    className="self-end"
                                    color="blue"
                                >
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                    >
                                        <Tooltip
                                            content="Atur"
                                            className="rounded-lg"
                                        >
                                            <MenuHandler>
                                                <Button
                                                    className="px-3 rounded-r-none flex items-center gap-1"
                                                    color="blue"
                                                    disabled={
                                                        !data ||
                                                        (data &&
                                                            data.length == 0)
                                                    }
                                                >
                                                    <MdCheckBox className="w-4 h-4" />
                                                </Button>
                                            </MenuHandler>
                                        </Tooltip>
                                        <MenuList className="border border-slate-300 max-h-[20rem] table-siswa p-2.5">
                                            {Thead.map((d, i) => (
                                                <MenuItem
                                                    key={i}
                                                    className="py-1"
                                                >
                                                    <Checkbox
                                                        checked={d.checked}
                                                        color="blue"
                                                        label={d.name}
                                                        containerProps={{
                                                            className:
                                                                "p-2 mr-1",
                                                        }}
                                                        onChange={() =>
                                                            changeThead(d.name)
                                                        }
                                                    />
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                    <Tooltip
                                        content="Cetak"
                                        className="rounded-lg"
                                    >
                                        <Button
                                            className="px-3 flex items-center gap-1 rounded-l-none"
                                            color="blue"
                                            disabled={
                                                !data ||
                                                (data && data.length == 0)
                                            }
                                        >
                                            <BsPrinterFill className="w-4 h-4" />
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </div>
                            <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                            <th className="py-2 px-4 whitespace-nowrap">
                                                No
                                            </th>
                                            {Thead.filter((item) => {
                                                if (
                                                    auth.user.role === "admin"
                                                ) {
                                                    return item.checked;
                                                } else {
                                                    return (
                                                        item.checked &&
                                                        item.role === "siswa"
                                                    );
                                                }
                                            }).map((d, i) => (
                                                <th
                                                    key={i}
                                                    className="py-2 px-4 whitespace-nowrap"
                                                >
                                                    {d.name}
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
                                                        {Thead.filter(
                                                            (item) => {
                                                                if (
                                                                    auth.user
                                                                        .role ===
                                                                    "admin"
                                                                ) {
                                                                    return item.checked;
                                                                } else {
                                                                    return (
                                                                        item.checked &&
                                                                        item.role ===
                                                                            "siswa"
                                                                    );
                                                                }
                                                            }
                                                        ).map(
                                                            (header, index) => (
                                                                <td
                                                                    key={index}
                                                                    className="py-2 px-4 whitespace-nowrap"
                                                                >
                                                                    {header.name ===
                                                                        "Kode" &&
                                                                        d.kode}
                                                                    {header.name ===
                                                                        "Nama" &&
                                                                        d.siswa
                                                                            ?.nama}
                                                                    {header.name ===
                                                                        "Nis" &&
                                                                        d.siswa
                                                                            ?.nis}
                                                                    {header.name ===
                                                                        "Kelas" &&
                                                                        d.siswa
                                                                            ?.kelas
                                                                            .kelas}
                                                                    {header.name ===
                                                                        "Periode" &&
                                                                        d.periode}
                                                                    {header.name ===
                                                                        "Tanggal Bayar" &&
                                                                        moment(
                                                                            d.created_at
                                                                        ).format(
                                                                            "DD MMMM YYYY"
                                                                        )}
                                                                    {header.name ===
                                                                        "Status" && (
                                                                        <Chip
                                                                            value={
                                                                                d.status
                                                                            }
                                                                        />
                                                                    )}
                                                                    {header.name ===
                                                                        "Jumlah Bayar" &&
                                                                        "Rp." +
                                                                            d.jumlah_bayar
                                                                                .toString()
                                                                                .replace(
                                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                                    "."
                                                                                )}
                                                                    {header.name ===
                                                                        "Petugas" &&
                                                                        d.nama_petugas}
                                                                    {header.name ===
                                                                        "Opsi" && (
                                                                        <Link
                                                                            href={route(
                                                                                "kwitansi",
                                                                                btoa(
                                                                                    `${d.nis}_${d.kode}_${d.id}`
                                                                                )
                                                                            )}
                                                                        >
                                                                            <Button
                                                                                color="blue"
                                                                                variant="gradient"
                                                                                className="flex items-center gap-2 py-2 px-3"
                                                                            >
                                                                                <HiEye className="w-4 h-4" />
                                                                                Lihat
                                                                                Kwitansi
                                                                            </Button>
                                                                        </Link>
                                                                    )}
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        Histori masih kosong
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
            <Dialog open={dialogKwitansi} handler={setDialogKwitansi}>
                <DialogBody className="relative">
                    <Kwitansi dialog={true} />
                </DialogBody>
            </Dialog>
        </>
    );
}
