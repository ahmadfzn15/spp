import Layout from "@/Layouts/Layout";
import {
    HiBars3,
    HiEye,
    HiMagnifyingGlass,
    HiPencil,
    HiPlus,
    HiPrinter,
    HiTrash,
    HiXMark,
} from "react-icons/hi2";
import { Head, Link } from "@inertiajs/react";
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
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
    Option,
    Radio,
    Select,
    Spinner,
    Textarea,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { MdCheckBox, MdChecklist, MdError } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { useSetting } from "@/utils/settings";
import {
    BsArrowLeft,
    BsArrowRight,
    BsCheck2Circle,
    BsDownload,
    BsFileExcel,
    BsFilePdf,
    BsFiletypeJson,
} from "react-icons/bs";

export default function DataSiswa({ auth, data, kelas }) {
    const card = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sort, setSort] = useState(true);
    const [datas, setDatas] = useState();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const [kelass, setKelass] = useState(kelas);
    const [searchKelas, setSearchKelas] = useState("");
    const [active, setActive] = useState(1);
    const [tampil, setTampil] = useState(20);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [chose, setChose] = useState(false);
    const [dialogDeleteSelected, setDialogDeleteSelected] = useState(false);
    const [addSiswa, setAddSiswa] = useState(false);
    const [editSiswa, setEditSiswa] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [fieldEdit, setFieldEdit] = useState({
        nama: "",
        nis: "",
        nisn: "",
        id_kelas: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        alamat: "",
        agama: "",
    });

    const [field, setField] = useState({
        nama: "",
        nis: "",
        nisn: "",
        id_kelas: "",
        jenis_kelamin: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        alamat: "",
        agama: "",
        password: "",
    });

    const { color } = useSetting();
    const prev = () => {
        if (datas.current_page === 1) null;
        setActive(active - 1);
    };
    const next = () => {
        if (datas.current_page === datas.last_page) null;
        setActive(active + 1);
    };

    useEffect(() => {
        const getResult = async () => {
            const d = await axios.get(
                `/api/siswa?page=${active}&per_page=${tampil}`
            );
            setDatas({
                ...d.data,
                data: d.data.data.map((item) => ({ ...item, checked: false })),
            });
        };

        getResult();
    }, [status, active, tampil]);

    useEffect(() => {
        const getResult = async () => {
            const d = await axios.get(
                `/api/siswa?page=${active}&per_page=${tampil}&search=${searchQuery}`
            );
            setDatas({ ...d.data, data: d.data.data.map((item) => item) });
        };

        getResult();
    }, [searchQuery]);

    const submitAddSiswa = async (e) => {
        e.preventDefault();
        setAddSiswa(!addSiswa);

        const res = await axios.post("/api/siswa/add", { data: field });
        if (res.status == 200) {
            setStatus(!status);
            setAlert({ open: true, type: "success", message: res.data });
        } else {
            setAlert({ open: true, type: "failed", message: res.data });
        }
    };

    const clickEdit = (id) => {
        setEditSiswa(!editSiswa);

        const dataEdit = datas.data.find((item) => item.id == id);
        setFieldEdit({ ...dataEdit, kelas: dataEdit.kelas.kelas });
    };

    const submitEditSiswa = async (e) => {
        e.preventDefault();
        setEditSiswa(!editSiswa);

        const res = await axios.put(route("update.siswa", btoa(fieldEdit.id)), {
            data: fieldEdit,
        });
        if (res.status == 200) {
            setStatus(!status);
            setAlert({ open: true, type: "success", message: res.data });
        } else {
            setAlert({ open: true, type: "failed", message: res.data });
        }
    };

    const downloadPdf = async () => {
        setLoading(true);

        await axios("/api/siswa/download/pdf", {
            responseType: "blob",
        })
            .then((res) => {
                const blob = new Blob([res.data]);
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "siswa.pdf";
                a.click();
            })
            .catch((err) => {
                console.error(err);
            });

        setLoading(false);
    };

    const downloadJson = async () => {
        setLoading(true);

        await axios("/api/siswa/download/json")
            .then((res) => {
                const blob = new Blob([JSON.stringify(res.data)], {
                    type: "application/json",
                });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "siswa.json";
                a.click();
            })
            .catch((err) => {
                console.error(err);
            });

        setLoading(false);
    };

    const downloadExcel = async () => {
        setLoading(true);

        await axios("/api/siswa/download/excel", {
            responseType: "blob",
        })
            .then((res) => {
                const blob = new Blob([res.data]);
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = "siswa.xls";
                a.click();
            })
            .catch((err) => {
                console.error(err);
            });

        setLoading(false);
    };

    const [Thead, setThead] = useState([
        {
            name: "Nama",
            checked: true,
        },
        {
            name: "Nis",
            checked: true,
        },
        {
            name: "Nisn",
            checked: true,
        },
        {
            name: "Kelas",
            checked: true,
        },
        {
            name: "Jenis Kelamin",
            checked: true,
        },
        {
            name: "Tempat Lahir",
            checked: false,
        },
        {
            name: "Tanggal Lahir",
            checked: false,
        },
        {
            name: "Alamat",
            checked: false,
        },
        {
            name: "Agama",
            checked: false,
        },
        {
            name: "Opsi",
            checked: true,
        },
    ]);

    const deleteSelectedSiswa = async () => {
        const d = datas.data.filter((item) => item.checked == true);
        setDialogDeleteSelected(!dialogDeleteSelected);
        setChose(false);

        try {
            const res = await axios.post("/api/siswa", {
                data: d.map((item) => item.id),
            });

            if (res.status == 200) {
                setStatus(!status);
                setAlert({ open: true, type: "success", message: res.data });
            } else {
                setAlert({ open: true, type: "failed", message: res.data });
            }
        } catch (error) {
            setAlert({
                open: true,
                type: "failed",
                message: "Gagal menghapus data!",
            });
        }
    };

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setDatas((d) => ({
            ...d,
            data: d.data.map((item) => ({
                ...item,
                checked: !selectAll,
            })),
        }));
    };

    const handleChecked = (id) => {
        setDatas((d) => ({
            ...d,
            data: d.data.map((item) =>
                item.id == id
                    ? {
                          ...item,
                          checked: !item.checked,
                      }
                    : { ...item }
            ),
        }));
    };

    const changeThead = (e) => {
        setThead((d) =>
            d.map((item) =>
                item.name == e
                    ? { ...item, checked: !item.checked }
                    : { ...item }
            )
        );
    };

    const sortBy = async (e) => {
        setSort(!sort);
        const asc = sort ? "asc" : "desc";
        const d = await axios.get(
            `/api/siswa?sortBy=${e}&sort=${asc}&page=${active}&per_page=${tampil}`
        );
        setDatas(d.data);
    };

    const setKelas = (e) => {
        if (e == "all") {
            setDatas(data);
            return;
        }
        const result = data.data.filter((d) => d.id_kelas == e);
        setDatas(result);
    };

    const filterKelas = () => {
        const data = kelas.filter((item) =>
            item.kelas.toLowerCase().includes(searchKelas.toLowerCase())
        );
        setKelass(data);
    };

    useEffect(() => {
        if (alert.open) {
            setTimeout(() => {
                setAlert({ open: false });
            }, 3000);
        }
    }, [alert.open]);

    useEffect(() => {
        gsap.from(card.current, {
            y: 40,
            duration: 0.5,
            opacity: 0,
        });
    }, []);

    return (
        <>
            <Head title="Data Siswa" />
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
                    <CardHeader color={color} className="px-5 py-4">
                        <Typography variant="h5">Data Siswa</Typography>
                    </CardHeader>
                    <CardBody className="p-5 mt-4">
                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-end gap-4">
                                <Input
                                    label="Search"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    color="blue"
                                    icon={
                                        <HiMagnifyingGlass className="w-5 h-5" />
                                    }
                                />
                                <Select
                                    label="Kelas"
                                    color="blue"
                                    menuProps={{
                                        className:
                                            "border border-slate-300 shadow shadow-slate-400",
                                    }}
                                    animate={{
                                        mount: { y: 0, opacity: 1 },
                                        unmount: { y: 30, opacity: 0 },
                                    }}
                                    onChange={(e) => setKelas(e)}
                                >
                                    {kelass?.map((d, i) => (
                                        <Option key={i} value={d.id.toString()}>
                                            {d.kelas}
                                        </Option>
                                    ))}
                                </Select>
                                <Button
                                    className="flex items-center gap-1 whitespace-nowrap text-sm py-2.5 px-4 active:scale-95 w-[25rem]"
                                    color="green"
                                    variant="gradient"
                                    onClick={() => setAddSiswa(true)}
                                >
                                    <HiPlus className="w-5 h-5 shrink-0" />
                                    Tambah Siswa
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                {chose ? (
                                    <div className="flex items-center gap-4">
                                        <Button
                                            onClick={() => {
                                                if (
                                                    datas.data.filter(
                                                        (item) =>
                                                            item.checked == true
                                                    ).length != 0
                                                ) {
                                                    setDialogDeleteSelected(
                                                        !dialogDeleteSelected
                                                    );
                                                }
                                            }}
                                            color="red"
                                            className="py-2 px-3 flex items-end gap-1"
                                        >
                                            <HiTrash className="w-4 h-4" />
                                            Delete
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setChose(!chose);
                                                setDatas((d) => ({
                                                    ...d,
                                                    data: d.data.map(
                                                        (item) => ({
                                                            ...item,
                                                            checked: false,
                                                        })
                                                    ),
                                                }));
                                            }}
                                            color="green"
                                            className="py-2 px-3 flex items-end gap-1"
                                        >
                                            <HiXMark className="w-4 h-4" />
                                            Batal
                                        </Button>
                                        <Typography>
                                            {
                                                datas.data.filter(
                                                    (item) =>
                                                        item.checked == true
                                                ).length
                                            }{" "}
                                            dipilih
                                        </Typography>
                                    </div>
                                ) : (
                                    <div className="w-20">
                                        <Select
                                            menuProps={{
                                                className:
                                                    "border-slate-300 py-1",
                                            }}
                                            color={color}
                                            label="Tampilkan"
                                            value={tampil}
                                            onChange={(e) => setTampil(e)}
                                        >
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={15}>15</Option>
                                            <Option value={20}>20</Option>
                                            <Option value={25}>25</Option>
                                            <Option value="">Semua</Option>
                                        </Select>
                                    </div>
                                )}
                                <ButtonGroup color="blue">
                                    <Tooltip
                                        content="Hapus Data"
                                        className="rounded-lg"
                                    >
                                        <Button
                                            color="blue"
                                            className="px-3 flex items-center gap-1 rounded-r-none"
                                            onClick={() => {
                                                setChose(!chose);
                                                setDatas((d) => ({
                                                    ...d,
                                                    data: d.data.map(
                                                        (item) => ({
                                                            ...item,
                                                            checked: false,
                                                        })
                                                    ),
                                                }));
                                            }}
                                            disabled={
                                                !datas ||
                                                (datas &&
                                                    datas.data.length == 0)
                                            }
                                        >
                                            <HiTrash className="w-4 h-4" />
                                        </Button>
                                    </Tooltip>
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
                                                    className="px-3 rounded-none flex items-center gap-1"
                                                    color="blue"
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
                                    <Menu>
                                        <Tooltip content="Unduh">
                                            <MenuHandler>
                                                <Button
                                                    className="px-3 rounded-none flex items-center gap-1"
                                                    color="blue"
                                                    disabled={
                                                        !datas ||
                                                        (datas &&
                                                            datas.data.length ==
                                                                0)
                                                    }
                                                >
                                                    <BsDownload className="w-4 h-4" />
                                                </Button>
                                            </MenuHandler>
                                        </Tooltip>
                                        <MenuList className="border border-slate-300 max-h-[20rem] table-siswa p-2.5">
                                            <MenuItem
                                                onClick={downloadJson}
                                                className="flex items-end gap-2"
                                            >
                                                <BsFiletypeJson className="w-4 h-4" />
                                                <h1>Unduh Json</h1>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={downloadPdf}
                                                className="flex items-end gap-2"
                                            >
                                                <BsFilePdf className="w-4 h-4" />
                                                <h1>Unduh Pdf</h1>
                                            </MenuItem>
                                            <MenuItem
                                                onClick={downloadExcel}
                                                className="flex items-end gap-2"
                                            >
                                                <BsFileExcel className="w-4 h-4" />
                                                <h1>Unduh Excel</h1>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Tooltip
                                        content="Cetak"
                                        className="rounded-lg"
                                    >
                                        <Button
                                            className="px-3 rounded-l-none"
                                            color="blue"
                                            disabled={
                                                !datas ||
                                                (datas &&
                                                    datas.data.length == 0)
                                            }
                                        >
                                            <Link
                                                href={route("report.siswa")}
                                                className="flex items-center gap-1"
                                            >
                                                <HiPrinter className="w-4 h-4" />{" "}
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </div>
                            <div className="overflow-x-auto max-h-[30rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                            {chose ? (
                                                <Checkbox
                                                    containerProps={{
                                                        className: "p-2 mt-1",
                                                    }}
                                                    color="blue"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                            ) : (
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    No
                                                </th>
                                            )}
                                            {Thead.filter(
                                                (item) => item.checked
                                            ).map((d, i) => (
                                                <th
                                                    key={i}
                                                    className="py-2 px-4"
                                                >
                                                    <div className="whitespace-nowrap flex items-center justify-center">
                                                        {d.name != "Opsi" && (
                                                            <FaSort
                                                                className="w-4 h-4 cursor-pointer"
                                                                onClick={() =>
                                                                    sortBy(
                                                                        d.name
                                                                    )
                                                                }
                                                            />
                                                        )}
                                                        <h1 className="text-sm">
                                                            {d.name}
                                                        </h1>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas ? (
                                            datas.data.length != 0 ? (
                                                datas.data.map((d, i) => (
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
                                                                        d.id
                                                                    )
                                                                }
                                                                color="blue"
                                                            />
                                                        ) : (
                                                            <td className="py-1 px-4 whitespace-nowrap">
                                                                {d.id}.
                                                            </td>
                                                        )}
                                                        <td
                                                            onClick={() =>
                                                                handleChecked(
                                                                    d.id
                                                                )
                                                            }
                                                            className={`${
                                                                Thead[0].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.nama}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[1].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.nis}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[2].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.nisn}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[3].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.kelas.kelas}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[4].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.jenis_kelamin}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[5].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.tempat_lahir}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[6].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.tanggal_lahir}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[7].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.alamat}
                                                        </td>
                                                        <td
                                                            className={`${
                                                                Thead[8].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            } py-1 px-4 whitespace-nowrap`}
                                                        >
                                                            {d.agama}
                                                        </td>
                                                        <td className="py-1 px-4 whitespace-nowrap">
                                                            <Menu
                                                                animate={{
                                                                    mount: {
                                                                        y: 0,
                                                                        opacity: 1,
                                                                    },
                                                                    unmount: {
                                                                        y: 20,
                                                                        opacity: 0,
                                                                    },
                                                                }}
                                                            >
                                                                <MenuHandler>
                                                                    <IconButton
                                                                        color="blue"
                                                                        variant="gradient"
                                                                        className="active:scale-90"
                                                                        size="sm"
                                                                    >
                                                                        <HiBars3 className="w-6 h-6" />
                                                                    </IconButton>
                                                                </MenuHandler>
                                                                <MenuList className="border-slate-300 py-1">
                                                                    <Link
                                                                        href={route(
                                                                            "siswa.detail",
                                                                            btoa(
                                                                                d.id.toString()
                                                                            )
                                                                        )}
                                                                        className="hover:outline-none focus:outline-none"
                                                                    >
                                                                        <MenuItem className="flex gap-2 px-4 text-blue-500 hover:text-blue-600">
                                                                            <HiEye className="w-4 h-4" />
                                                                            Detail
                                                                        </MenuItem>
                                                                    </Link>
                                                                    <MenuItem
                                                                        className="flex gap-2 px-4 text-green-500 hover:text-green-600"
                                                                        onClick={() =>
                                                                            clickEdit(
                                                                                d.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <HiPencil className="w-4 h-4" />
                                                                        Edit
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </td>
                                                    </tr>
                                                ))
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
                            <div className="flex items-center gap-2">
                                <IconButton
                                    color="blue"
                                    variant="gradient"
                                    onClick={prev}
                                    disabled={datas?.current_page == 1}
                                >
                                    <BsArrowLeft className="w-4 h-4" />
                                </IconButton>
                                <Typography>
                                    {datas?.current_page} of {datas?.last_page}
                                </Typography>
                                <IconButton
                                    color="blue"
                                    variant="gradient"
                                    onClick={next}
                                    disabled={
                                        datas?.last_page == datas?.current_page
                                    }
                                >
                                    <BsArrowRight className="w-4 h-4" />
                                </IconButton>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Layout>
            <Dialog
                open={dialogDeleteSelected}
                handler={setDialogDeleteSelected}
                className="bg-slate-200"
            >
                <DialogBody className="py-5">
                    <Typography variant="h5" color="black">
                        Apakah yakin anda ingin menghapus{" "}
                        {
                            datas?.data.filter((item) => item.checked == true)
                                .length
                        }{" "}
                        data siswa ini?
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-4">
                    <Button
                        color="green"
                        onClick={() =>
                            setDialogDeleteSelected(!dialogDeleteSelected)
                        }
                    >
                        Tidak
                    </Button>
                    <Button color="red" onClick={deleteSelectedSiswa}>
                        Ya
                    </Button>
                </DialogFooter>
            </Dialog>
            <Dialog open={addSiswa} className="bg-slate-200">
                <DialogHeader className="flex justify-between">
                    <Typography variant="h4">Form Tambah Siswa</Typography>
                    <IconButton
                        variant="text"
                        onClick={() => setAddSiswa(false)}
                    >
                        <HiXMark className="w-7 h-7" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="py-3" divider>
                    <form onSubmit={submitAddSiswa}>
                        <div className="w-full space-y-4 max-h-[27rem] overflow-auto table-siswa pr-3 py-4 rounded-lg">
                            <Input
                                label="Nama"
                                color="blue"
                                name="nama"
                                value={field.nama}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nama: e.target.value,
                                    })
                                }
                                autoFocus
                                required
                            />
                            <Input
                                label="Nis"
                                color="blue"
                                name="nis"
                                value={field.nis}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nis: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="Nisn"
                                color="blue"
                                name="nisn"
                                value={field.nisn}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        nisn: e.target.value,
                                    })
                                }
                                required
                            />
                            <Select
                                label="Kelas"
                                color="blue"
                                menuProps={{
                                    className:
                                        "border border-slate-300 shadow shadow-slate-400",
                                }}
                                animate={{
                                    mount: { y: 0, opacity: 1 },
                                    unmount: { y: 30, opacity: 0 },
                                }}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        id_kelas: e,
                                    })
                                }
                                value={field.id_kelas?.toString()}
                                required
                            >
                                {kelas?.map((d, i) => (
                                    <Option key={i} value={d.id.toString()}>
                                        {d.kelas}
                                    </Option>
                                ))}
                            </Select>
                            <div className="flex flex-col">
                                <label className="text-slate-600 text-md">
                                    Jenis Kelamin
                                </label>
                                <div className="flex gap-1">
                                    <Radio
                                        label="Laki-laki"
                                        color="blue"
                                        name="gender"
                                        value="Laki-laki"
                                        onChange={(e) =>
                                            setField({
                                                ...field,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                    <Radio
                                        label="Perempuan"
                                        color="blue"
                                        name="gender"
                                        value="Perempuan"
                                        onChange={(e) =>
                                            setField({
                                                ...field,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                </div>
                            </div>
                            <Input
                                type="text"
                                label="Tempat Lahir"
                                color="blue"
                                name="tempat_lahir"
                                value={field.tempat_lahir}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        tempat_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="date"
                                label="Tanggal Lahir"
                                color="blue"
                                name="tanggal_lahir"
                                value={field.tanggal_lahir}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        tanggal_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Textarea
                                name="alamat"
                                color="blue"
                                resize={false}
                                label="Alamat"
                                value={field.alamat}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        alamat: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Agama"
                                color="blue"
                                name="agama"
                                value={field.agama}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        agama: e.target.value,
                                    })
                                }
                            />
                            <Input
                                type="password"
                                label="Password"
                                color="blue"
                                name="password"
                                value={field.password}
                                onChange={(e) =>
                                    setField({
                                        ...field,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            color="green"
                            fullWidth
                            className="mt-2"
                        >
                            Simpan
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter className="p-2"></DialogFooter>
            </Dialog>
            <Dialog open={editSiswa} className="bg-slate-200">
                <DialogHeader className="flex justify-between">
                    <Typography variant="h4">Form Edit Siswa</Typography>
                    <IconButton
                        variant="text"
                        onClick={() => setEditSiswa(false)}
                    >
                        <HiXMark className="w-7 h-7" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="py-3" divider>
                    <form onSubmit={submitEditSiswa}>
                        <div className="w-full space-y-4 max-h-[27rem] overflow-auto table-siswa pr-3 py-4 rounded-lg">
                            <Input
                                label="Nama"
                                color="blue"
                                name="nama"
                                value={fieldEdit.nama}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nama: e.target.value,
                                    })
                                }
                                autoFocus
                                required
                            />
                            <Input
                                label="Nis"
                                color="blue"
                                name="nis"
                                value={fieldEdit.nis}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nis: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                label="Nisn"
                                color="blue"
                                name="nisn"
                                value={fieldEdit.nisn}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        nisn: e.target.value,
                                    })
                                }
                                required
                            />
                            <Select
                                label="Kelas"
                                color="blue"
                                menuProps={{
                                    className:
                                        "border border-slate-300 shadow shadow-slate-400",
                                }}
                                animate={{
                                    mount: { y: 0, opacity: 1 },
                                    unmount: { y: 30, opacity: 0 },
                                }}
                                required
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        id_kelas: e,
                                    })
                                }
                                value={fieldEdit.id_kelas?.toString()}
                            >
                                {kelas?.map((d, i) => (
                                    <Option key={i} value={d.id.toString()}>
                                        {d.kelas}
                                    </Option>
                                ))}
                            </Select>
                            <div className="flex flex-col">
                                <label className="text-slate-600 text-md">
                                    Jenis Kelamin
                                </label>
                                <div className="flex gap-1">
                                    <Radio
                                        label="Laki-laki"
                                        color="blue"
                                        name="gender"
                                        value="Laki-laki"
                                        checked={
                                            fieldEdit.jenis_kelamin ==
                                            "Laki-laki"
                                        }
                                        onChange={(e) =>
                                            setFieldEdit({
                                                ...fieldEdit,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                    <Radio
                                        label="Perempuan"
                                        color="blue"
                                        name="gender"
                                        value="Perempuan"
                                        checked={
                                            fieldEdit.jenis_kelamin ==
                                            "Perempuan"
                                        }
                                        onChange={(e) =>
                                            setFieldEdit({
                                                ...fieldEdit,
                                                jenis_kelamin: e.target.value,
                                            })
                                        }
                                        containerProps={{
                                            className: "scale-75",
                                        }}
                                    />
                                </div>
                            </div>
                            <Input
                                type="text"
                                label="Tempat Lahir"
                                color="blue"
                                name="tempat_lahir"
                                value={fieldEdit.tempat_lahir}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        tempat_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type="date"
                                label="Tanggal Lahir"
                                color="blue"
                                name="tanggal_lahir"
                                value={fieldEdit.tanggal_lahir}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        tanggal_lahir: e.target.value,
                                    })
                                }
                                required
                            />
                            <Textarea
                                name="alamat"
                                color="blue"
                                resize={false}
                                label="Alamat"
                                value={fieldEdit.alamat}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        alamat: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Agama"
                                color="blue"
                                name="agama"
                                value={fieldEdit.agama}
                                onChange={(e) =>
                                    setFieldEdit({
                                        ...fieldEdit,
                                        agama: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <Button
                            type="submit"
                            color="green"
                            fullWidth
                            className="mt-2"
                        >
                            Update
                        </Button>
                    </form>
                </DialogBody>
                <DialogFooter className="p-2"></DialogFooter>
            </Dialog>
        </>
    );
}
