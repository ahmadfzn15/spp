import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import { Head } from "@inertiajs/react";
import {
    Button,
    ButtonGroup,
    Card,
    Chip,
    CardBody,
    CardHeader,
    Checkbox,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Option,
    Select,
    Typography,
    Dialog,
    DialogBody,
    DialogFooter,
    Spinner,
    Alert,
    Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BsPrinterFill } from "react-icons/bs";
import { HiBars3, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { MdCheckBox, MdClear } from "react-icons/md";

export default function DataSpp({ auth, title, periode }) {
    const card = useRef(null);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState(false);
    const [data, setData] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [focusSearch, setFocusSearch] = useState(false);
    const { color } = useSetting();

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

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
            checked: false,
        },
        {
            name: "Kelas",
            checked: true,
        },
        {
            name: "Status",
            checked: true,
        },
        {
            name: "Opsi",
            checked: true,
        },
    ]);

    const today = () => {
        const date = new Date();
        const month = date.getMonth();
        const y = date.getFullYear();

        let m = "";
        switch (month + 1) {
            case 1:
                m = "Januari";
                break;
            case 2:
                m = "Februari";
                break;
            case 3:
                m = "Maret";
                break;
            case 4:
                m = "April";
                break;
            case 5:
                m = "Mei";
                break;
            case 6:
                m = "Juni";
                break;
            case 7:
                m = "Juli";
                break;
            case 8:
                m = "Agustus";
                break;
            case 9:
                m = "September";
                break;
            case 10:
                m = "Oktober";
                break;
            case 11:
                m = "November";
                break;
            case 12:
                m = "Desember";
                break;
            default:
                m = null;
                break;
        }

        setMonth(m);
        setYear(y);
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

    useEffect(() => {
        if (month && year) {
            setStatus(true);
            const getData = async () => {
                const result = await axios.get(
                    `/api/spp?month=${month}&year=${year}`
                );
                if (result.status == 200) {
                    if (result.data.siswa) {
                        const siswa = result.data.siswa;
                        const status = result.data.status;

                        setData(
                            siswa.map((d, i) => ({
                                ...d,
                                status: status[i].status,
                            }))
                        );
                    } else {
                        setData(null);
                    }
                } else {
                    setAlert({
                        open: true,
                        type: "error",
                        message: result.data,
                    });
                }
            };

            getData();
        }
    }, [month, year]);

    useEffect(() => {
        if (month && year && searchQuery) {
            const getResult = async () => {
                const result = await axios.get(
                    `/api/spp?month=${month}&year=${year}&search=${searchQuery}`
                );
                if (result.status == 200) {
                    if (result.data.siswa) {
                        const siswa = result.data.siswa;
                        const status = result.data.status;

                        setData(
                            siswa.map((d, i) => ({
                                ...d,
                                status: status[i].status,
                            }))
                        );
                    } else {
                        setData(null);
                    }
                } else {
                    setAlert({
                        open: true,
                        type: "error",
                        message: result.data,
                    });
                }
            };

            getResult();
        }
    }, [searchQuery]);

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
                    <CardHeader color={color} className="px-5 py-4">
                        <Typography variant="h5">Data Spp</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full flex flex-col space-y-4">
                            <div className="grid grid-cols-3 gap-5">
                                <Select
                                    label="Bulan"
                                    color={color}
                                    onChange={(e) => setMonth(e)}
                                    value={month}
                                >
                                    {months.map((d, i) => (
                                        <Option key={i} value={d}>
                                            {d}
                                        </Option>
                                    ))}
                                </Select>
                                <Select
                                    label="Tahun"
                                    onChange={(e) => setYear(e)}
                                    color={color}
                                    value={year}
                                >
                                    {periode.year.map((d, i) => (
                                        <Option key={i} value={d}>
                                            {d}
                                        </Option>
                                    ))}
                                </Select>
                                <Input
                                    label="Search"
                                    type="search"
                                    color="blue"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    icon={
                                        <HiMagnifyingGlass className="w-5 h-5" />
                                    }
                                    onFocus={() => setFocusSearch(!focusSearch)}
                                />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-5 items-center">
                                    <Button
                                        color="blue"
                                        variant="gradient"
                                        onClick={today}
                                    >
                                        Bulan Sekarang
                                    </Button>
                                    {data && (
                                        <>
                                            <div className="flex items-center gap-1">
                                                <h1>Lunas : </h1>
                                                <Chip
                                                    color="blue"
                                                    variant="gradient"
                                                    className="rounded-full"
                                                    value={
                                                        data.filter(
                                                            (d) =>
                                                                d.status ==
                                                                "Lunas"
                                                        ).length
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <h1>Belum Lunas : </h1>
                                                <Chip
                                                    color="blue"
                                                    variant="gradient"
                                                    className="rounded-full"
                                                    value={
                                                        data.filter(
                                                            (d) =>
                                                                d.status ==
                                                                "Belum Lunas"
                                                        ).length
                                                    }
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <ButtonGroup
                                    size="sm"
                                    className="self-end"
                                    color="blue"
                                >
                                    <Tooltip
                                        content="Clear"
                                        className="rounded-lg"
                                    >
                                        <Button
                                            className="px-3 flex items-center gap-1 rounded-r-none"
                                            color="blue"
                                            onClick={() => {
                                                setData(null);
                                                setMonth(null);
                                                setYear(null);
                                                setStatus(false);
                                            }}
                                            disabled={
                                                !data ||
                                                (data && data.length == 0) ||
                                                !status
                                            }
                                        >
                                            <MdClear className="w-4 h-4" />
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
                                                    disabled={
                                                        !data ||
                                                        (data &&
                                                            data.length == 0) ||
                                                        !status
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
                                                (data && data.length == 0) ||
                                                !status
                                            }
                                        >
                                            <BsPrinterFill className="w-4 h-4" />
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </div>
                            <div className="w-full overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                {status ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    No
                                                </th>
                                                {Thead.filter(
                                                    (item) => item.checked
                                                ).map((d, i) => (
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
                                                data.map((d, i) => (
                                                    <tr
                                                        key={i}
                                                        className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                                    >
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {i + 1}.
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[0].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.nama}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[1].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.nis}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[2].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.nisn}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[3].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.kelas.kelas}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[4].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            <Chip
                                                                color="blue"
                                                                value={d.status}
                                                            />
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[5].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
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
                                                                <MenuList className="border-slate-300 p-2">
                                                                    <MenuItem className="flex gap-2 px-4 text-green-500 hover:text-green-600"></MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        Data tidak ditemukan
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                ) : (
                                    <h1 className="text-center py-5 text-xl">
                                        Silahkan cari data SPP berdasarkan
                                        kategori tertentu!
                                    </h1>
                                )}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
