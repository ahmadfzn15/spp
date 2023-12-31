import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import {
    Alert,
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
    DialogHeader,
    IconButton,
    Input,
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
import { useEffect, useRef, useState } from "react";
import { BsCheck2Circle, BsPrinterFill } from "react-icons/bs";
import { FaLayerGroup, FaSortAmountDownAlt } from "react-icons/fa";
import { HiInformationCircle, HiXMark } from "react-icons/hi2";
import { MdError } from "react-icons/md";
import { PiCursorFill } from "react-icons/pi";

export default function Tagihan({ auth, title }) {
    const card = useRef(null);
    const [dialogBayarSpp, setDialogBayarSpp] = useState(false);
    const [idSpp, setIdSpp] = useState(null);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [data, setData] = useState(null);
    const [datas, setDatas] = useState({ data: [], jumlah: null });
    const [status, setStatus] = useState(false);
    const [chose, setChose] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [lastCheckedIndex, setLastCheckedIndex] = useState(null);

    const [group, setGroup] = useState("All");

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`/api/tagihan`);
            let filteredData = result.data;

            if (group == "All") {
                setData(
                    filteredData.map((item) => ({ ...item, checked: false }))
                );
            } else if (group == "Lunas") {
                setData(
                    filteredData
                        .filter((d) => d.id_status == 2)
                        .map((item) => ({ ...item, checked: false }))
                );
            } else if (group == "Belum") {
                setData(
                    filteredData
                        .filter((d) => d.id_status == 1)
                        .map((item) => ({ ...item, checked: false }))
                );
            } else if (group == "Menunggu") {
                setData(
                    filteredData
                        .filter((d) => d.id_status == 3)
                        .map((item) => ({ ...item, checked: false }))
                );
            }
        };

        getData();
    }, [status, group]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setData((d) =>
            d.map((item) =>
                item.id_status == 1
                    ? {
                          ...item,
                          checked: !selectAll,
                      }
                    : { ...item }
            )
        );
    };

    const handleChecked = (id, i) => {
        let startIndex = lastCheckedIndex === null ? 0 : lastCheckedIndex;
        let endIndex = i;

        if (lastCheckedIndex !== null) {
            startIndex = Math.min(lastCheckedIndex, i);
            endIndex = Math.max(lastCheckedIndex, i);
        }

        setData((d) =>
            d.map((item, index) => {
                if (
                    index >= startIndex &&
                    index <= endIndex &&
                    item.id_status == 1
                ) {
                    return {
                        ...item,
                        checked: !d[i].checked,
                    };
                }
                return item;
            })
        );

        setLastCheckedIndex(i);
    };

    const cancalSelect = () => {
        setChose(!chose);
        setData((d) =>
            d.map((item) => ({
                ...item,
                checked: false,
            }))
        );
        setLastCheckedIndex(null);
    };

    const showDialogBayar = () => {
        setDialogBayarSpp(!dialogBayarSpp);
        let jumlah = 0;
        data.filter((item) => item.checked).forEach(({ jumlah_bayar }) => {
            jumlah += jumlah_bayar;
        });
        setDatas({ data: data.filter((item) => item.checked), jumlah });
    };

    const bayarSpp = async (e) => {
        e.preventDefault();
        setDialogBayarSpp(false);
        setChose(!chose);

        const res = await axios.post("/api/spp/bayar", {
            data: {
                id: data.filter((item) => item.checked).map((d) => d.id),
                nis: auth.user.nis,
            },
        });
        if (res.status == 200) {
            setStatus(!status);
            setAlert({ open: true, type: "success", message: res.data });
        } else {
            setAlert({ open: true, type: "failed", message: res.data });
        }
    };

    const getSpp = () => {
        if (idSpp) {
            const res = data.find((item) => item.id == idSpp);
            setDatas(res);
        }
    };

    useEffect(() => {
        if (alert.open) {
            setTimeout(() => {
                setAlert({ open: false });
            }, 3000);
        }
    }, [alert.open]);

    useEffect(() => {
        getSpp();
    }, [idSpp]);

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
                {alert.open && (
                    <Alert
                        color={alert.type == "success" ? "green" : "red"}
                        variant="gradient"
                        className="fixed top-0 right-0 left-0 py-5"
                        animate={{
                            mount: { y: 0, opacity: 1 },
                            unmount: { y: -30, opacity: 0 },
                        }}
                        icon={
                            alert.type == "success" ? (
                                <BsCheck2Circle className="w-6 h-6" />
                            ) : (
                                <MdError className="w-6 h-6" />
                            )
                        }
                        open={alert.open}
                        action={
                            <HiXMark
                                className="w-6 h-6 absolute right-0 mr-5 cursor-pointer"
                                onClick={() => setAlert({ open: false })}
                            />
                        }
                    >
                        {alert.message}
                    </Alert>
                )}
                <Card className="mt-5 shadow-lg" ref={card}>
                    <CardHeader color="blue" className="px-5 py-4">
                        <Typography variant="h5">Tagihan Spp</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full space-y-4">
                            <div
                                className={`flex justify-between w-full"
                                }`}
                            >
                                {chose ? (
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={() => {
                                                if (
                                                    data.filter(
                                                        (item) =>
                                                            item.checked == true
                                                    ).length != 0
                                                ) {
                                                    showDialogBayar();
                                                }
                                            }}
                                            color="blue"
                                        >
                                            Bayar
                                        </Button>
                                        <Button
                                            onClick={cancalSelect}
                                            color="red"
                                        >
                                            Cancel
                                        </Button>
                                        <Typography>
                                            {
                                                data.filter(
                                                    (item) =>
                                                        item.checked == true
                                                ).length
                                            }{" "}
                                            dipilih
                                        </Typography>
                                    </div>
                                ) : (
                                    <Tooltip content="Pilih periode spp yang akan dibayar">
                                        <Button
                                            color="blue"
                                            onClick={() => setChose(!chose)}
                                            className="flex items-end gap-1"
                                        >
                                            <PiCursorFill className="w-4 h-4" />
                                            <h1>Pilih</h1>
                                        </Button>
                                    </Tooltip>
                                )}
                                <ButtonGroup color="blue">
                                    <Menu>
                                        <Tooltip
                                            content="Kelompokkan Menurut"
                                            className="bg-slate-800 rounded-full"
                                        >
                                            <MenuHandler>
                                                <IconButton
                                                    color="blue"
                                                    className="rounded-r-none"
                                                >
                                                    <FaLayerGroup className="w-4 h-4" />
                                                </IconButton>
                                            </MenuHandler>
                                        </Tooltip>
                                        <MenuList className="border border-slate-300 max-h-[20rem] table-siswa p-2.5">
                                            <MenuItem
                                                onClick={() =>
                                                    setGroup("Lunas")
                                                }
                                            >
                                                Lunas
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setGroup("Belum")
                                                }
                                            >
                                                Belum Lunas
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    setGroup("Menunggu")
                                                }
                                            >
                                                Menunggu Dikonfirmasi
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() => setGroup("All")}
                                            >
                                                Tampilkan Semua
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Tooltip
                                        content="Cetak"
                                        className="bg-slate-800 rounded-full"
                                    >
                                        <IconButton
                                            color="blue"
                                            className="rounded-l-none"
                                        >
                                            <BsPrinterFill className="w-4 h-4" />
                                        </IconButton>
                                    </Tooltip>
                                </ButtonGroup>
                            </div>
                            <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                            {chose ? (
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    <Checkbox
                                                        containerProps={{
                                                            className: "p-2",
                                                        }}
                                                        color="blue"
                                                        checked={selectAll}
                                                        onChange={
                                                            handleSelectAll
                                                        }
                                                    />
                                                </th>
                                            ) : (
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    No
                                                </th>
                                            )}
                                            <th className="py-2 px-4 whitespace-nowrap">
                                                Periode
                                            </th>
                                            <th className="py-2 px-4 whitespace-nowrap">
                                                Status
                                            </th>
                                            <th className="py-2 px-4 whitespace-nowrap">
                                                Jumlah Bayar
                                            </th>
                                            <th className="py-2 px-4 whitespace-nowrap">
                                                Jatuh Tempo
                                            </th>
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
                                                        {chose ? (
                                                            <Checkbox
                                                                containerProps={{
                                                                    className:
                                                                        "p-2 mt-1",
                                                                }}
                                                                checked={
                                                                    d.checked
                                                                }
                                                                onChange={() =>
                                                                    handleChecked(
                                                                        d.id,
                                                                        i
                                                                    )
                                                                }
                                                                color="blue"
                                                                disabled={
                                                                    d.id_status !=
                                                                    1
                                                                }
                                                            />
                                                        ) : (
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {i + 1}.
                                                            </td>
                                                        )}
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {d.periode.bulan +
                                                                " " +
                                                                d.periode
                                                                    .tahun_pertama +
                                                                "/" +
                                                                d.periode
                                                                    .tahun_kedua}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {d.status.status}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {"Rp." +
                                                                d.jumlah_bayar
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        "."
                                                                    )}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {d.jatuh_tempo
                                                                ? "Ya"
                                                                : "Tidak"}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        Tagihan kosong
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                <td
                                                    className="py-1 px-4 whitespace-nowrap"
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
            <Dialog open={dialogBayarSpp} className="bg-slate-200">
                <DialogHeader className="flex justify-between">
                    <Typography variant="h4">Form Bayar Spp</Typography>
                    <IconButton
                        variant="text"
                        onClick={() => setDialogBayarSpp(false)}
                    >
                        <HiXMark className="w-7 h-7" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="py-3" divider>
                    <form onSubmit={bayarSpp}>
                        <div className="w-full space-y-5 max-h-[27rem] overflow-auto table-siswa pr-3 py-4 rounded-lg">
                            <Input
                                label="Nama"
                                color="blue"
                                value={
                                    datas.data.length != 0 &&
                                    datas.data[0].siswa.nama
                                }
                                readOnly
                            />
                            <Input
                                label="Nis"
                                color="blue"
                                value={
                                    datas.data.length != 0 &&
                                    datas.data[0]?.siswa.nis
                                }
                                readOnly
                            />
                            <Input
                                label="Kelas"
                                color="blue"
                                value={
                                    datas.data.length != 0 &&
                                    datas.data[0]?.siswa.kelas.kelas
                                }
                                readOnly
                            />
                            <Input
                                label="Periode"
                                color="blue"
                                value={
                                    datas.data?.length > 1
                                        ? datas.data &&
                                          datas.data[0]?.periode.bulan +
                                              " " +
                                              datas.data[0]?.periode
                                                  .tahun_pertama +
                                              "/" +
                                              datas.data[0]?.periode
                                                  .tahun_kedua +
                                              " - " +
                                              datas.data[datas.data.length - 1]
                                                  ?.periode.bulan +
                                              " " +
                                              datas.data[datas.data.length - 1]
                                                  ?.periode.tahun_pertama +
                                              "/" +
                                              datas.data[datas.data.length - 1]
                                                  ?.periode.tahun_kedua
                                        : datas.data[0]?.periode.bulan +
                                          " " +
                                          datas.data[0]?.periode.tahun_pertama +
                                          "/" +
                                          datas.data[0]?.periode.tahun_kedua
                                }
                                readOnly
                            />
                            <Input
                                label="Jumlah Bayar"
                                color="blue"
                                value={
                                    datas.jumlah &&
                                    "Rp." +
                                        datas.jumlah
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                            )
                                }
                                readOnly
                            />
                        </div>
                        <Button
                            type="submit"
                            color="green"
                            fullWidth
                            className="mt-2"
                        >
                            Bayar
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter className="p-2"></DialogFooter>
            </Dialog>
        </>
    );
}
