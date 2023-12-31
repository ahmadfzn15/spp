import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import spp from "@/utils/spp";
import { Head, Link } from "@inertiajs/react";
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
    Tooltip,
    Typography,
    Dialog,
    DialogBody,
    DialogFooter,
    Spinner,
    Alert,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { BsCheck2Circle, BsPrinterFill } from "react-icons/bs";
import {
    HiBars3,
    HiBars4,
    HiMagnifyingGlass,
    HiPlus,
    HiXMark,
} from "react-icons/hi2";
import { MdConfirmationNumber } from "react-icons/md";
import { PiCursorFill } from "react-icons/pi";
import Datepicker from "react-tailwindcss-datepicker";

export default function Pembayaran({ auth, title, periode }) {
    const card = useRef(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [status, setStatus] = useState(false);
    const [data, setData] = useState(null);
    const [date, setDate] = useState(null);
    const { color } = useSetting();
    const [chose, setChose] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [alert, setAlert] = useState({ open: false, type: "", message: "" });

    const [Thead, setThead] = useState([
        {
            name: "Kode",
            checked: true,
        },
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
            name: "Periode",
            checked: true,
        },
        {
            name: "Status",
            checked: true,
        },
        {
            name: "Metode Pembayaran",
            checked: false,
        },
        {
            name: "Jumlah Bayar",
            checked: true,
        },
        {
            name: "Tanggal Bayar",
            checked: false,
        },
    ]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setData((d) =>
            d.map((item, i) => ({
                data: item.data.map((d) => d),
                checked: !selectAll,
                id: i,
            }))
        );
    };

    const handleChecked = (id) => {
        setData((d) =>
            d.map((item, i) =>
                item.id == id
                    ? {
                          data: item.data.map((d) => d),
                          checked: !item.checked,
                          id: i,
                      }
                    : { ...item }
            )
        );
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

    const Confirm = async () => {
        const checkedData = data.filter((item) => item.checked);

        const groupedData = checkedData.reduce((groups, item) => {
            const code = item.data[0].kode;
            if (!groups[code]) {
                groups[code] = [];
            }
            groups[code].push(item.data.map((d) => d.id));
            return groups;
        }, {});

        const idOnlyArray = Object.values(groupedData).map((group) =>
            group.reduce((acc, curr) => acc.concat(curr), [])
        );

        const res = await axios.post("/api/pembayaran/confirm", {
            data: idOnlyArray,
        });
        if (res.status == 200) {
            setStatus(!status);
            setChose(false);
            setAlert({ open: true, type: "success", message: res.data });
        } else {
            setChose(false);
            setAlert({ open: true, type: "failed", message: res.data });
        }
    };

    useEffect(() => {
        if (date) {
            const viewByDate = async () => {
                const result = await axios.get(
                    `/api/pembayaran?startDate=${date.startDate}&endDate=${date.endDate}`
                );

                setData(
                    result.data.map((item, i) => ({
                        data: item.map((d) => d),
                        checked: false,
                        id: i,
                    }))
                );
            };

            viewByDate();
        }
    }, [date]);

    useEffect(() => {
        const getResult = async () => {
            const result = await axios.get(
                `/api/pembayaran?search=${searchQuery}`
            );
            setData(
                result.data.map((item, i) => ({
                    data: item.map((d) => d),
                    checked: false,
                    id: i,
                }))
            );
        };

        getResult();
    }, [searchQuery]);

    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`/api/pembayaran`);

            setData(
                result.data.map((item, i) => ({
                    data: item.map((d) => d),
                    checked: false,
                    id: i,
                }))
            );
        };

        getData();
    }, [status]);

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
    console.log(data && data.length);

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
                        <Typography variant="h5">Pembayaran Spp</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full flex flex-col space-y-4">
                            <div className="flex items-center justify-between gap-5">
                                <Datepicker
                                    minDate={`${periode[0].tahun_pertama}-07-01`}
                                    maxDate={`${periode[1].tahun_kedua}-06-01`}
                                    showShortcuts
                                    primaryColor="blue"
                                    inputClassName="w-full border border-slate-300 p-2 rounded-lg focus:outline-blue-500"
                                    value={date}
                                    onChange={(e) => setDate(e)}
                                    popoverDirection="down"
                                />
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
                                />
                            </div>
                            <div
                                className={`flex w-full ${
                                    data && data.length != 0
                                        ? "justify-between"
                                        : "justify-end"
                                }`}
                            >
                                {chose ? (
                                    <div className="flex items-center gap-4">
                                        <Button color="blue" onClick={Confirm}>
                                            Konfirmasi
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setChose(!chose);
                                                setData((d) =>
                                                    d.map((item) => ({
                                                        ...item,
                                                        checked: false,
                                                    }))
                                                );
                                            }}
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
                                    data &&
                                    data.length != 0 && (
                                        <Tooltip content="Pilih periode spp yang akan dibayar">
                                            <Button
                                                color="blue"
                                                onClick={() => setChose(!chose)}
                                                className="flex items-end gap-1"
                                            >
                                                <PiCursorFill className="w-4 h-4" />
                                                <h1>Konfirmasi</h1>
                                            </Button>
                                        </Tooltip>
                                    )
                                )}
                                <ButtonGroup
                                    size="sm"
                                    className="self-end"
                                    color="blue"
                                >
                                    <Tooltip
                                        content="Pilih"
                                        className="rounded-md bg-slate-800"
                                    >
                                        <Button
                                            className="px-3 rounded-r-none"
                                            color="blue"
                                            onClick={() => setChose(!chose)}
                                            disabled={
                                                (data && data.length == 0) ||
                                                !data
                                            }
                                        >
                                            <PiCursorFill className="w-4 h-4" />
                                        </Button>
                                    </Tooltip>
                                    <Menu
                                        dismiss={{
                                            itemPress: false,
                                        }}
                                    >
                                        <MenuHandler>
                                            <Button
                                                className="px-3 rounded-none"
                                                color="blue"
                                            >
                                                <HiBars4 className="w-4 h-4" />
                                            </Button>
                                        </MenuHandler>
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
                                        content="Print out"
                                        className="rounded-md bg-slate-800"
                                    >
                                        <Button
                                            className="px-3 rounded-l-none"
                                            color="blue"
                                            disabled={
                                                (data && data.length == 0) ||
                                                !data
                                            }
                                        >
                                            <BsPrinterFill className="w-4 h-4" />
                                        </Button>
                                    </Tooltip>
                                </ButtonGroup>
                            </div>
                            <div className="w-full overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
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
                                                                        i
                                                                    )
                                                                }
                                                                color="blue"
                                                            />
                                                        ) : (
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {i + 1}.
                                                            </td>
                                                        )}
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[0].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.data[0].kode}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[1].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0].spp
                                                                    .siswa.nama
                                                            }
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[2].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0].spp
                                                                    .siswa.nis
                                                            }
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[3].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0].spp
                                                                    .siswa.nisn
                                                            }
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[4].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0].spp
                                                                    .siswa.kelas
                                                                    .kelas
                                                            }
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[5].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {d.data.length > 1
                                                                ? d.data[0].spp
                                                                      .periode
                                                                      .bulan +
                                                                  " " +
                                                                  d.data[0].spp
                                                                      .periode
                                                                      .tahun_pertama +
                                                                  "/" +
                                                                  d.data[0].spp
                                                                      .periode
                                                                      .tahun_kedua +
                                                                  " - " +
                                                                  d.data[
                                                                      d.data
                                                                          .length -
                                                                          1
                                                                  ].spp.periode
                                                                      .bulan +
                                                                  " " +
                                                                  d.data[
                                                                      d.data
                                                                          .length -
                                                                          1
                                                                  ].spp.periode
                                                                      .tahun_pertama +
                                                                  "/" +
                                                                  d.data[
                                                                      d.data
                                                                          .length -
                                                                          1
                                                                  ].spp.periode
                                                                      .tahun_kedua
                                                                : d.data[0].spp
                                                                      .periode
                                                                      .bulan +
                                                                  " " +
                                                                  d.data[0].spp
                                                                      .periode
                                                                      .tahun_pertama +
                                                                  "/" +
                                                                  d.data[0].spp
                                                                      .periode
                                                                      .tahun_kedua}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[6].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            <Chip
                                                                color="blue"
                                                                value={
                                                                    d.data[0]
                                                                        .status
                                                                        .status
                                                                }
                                                            />
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[7].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0]
                                                                    .metode_pembayaran
                                                            }
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[8].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {"Rp." +
                                                                d.data
                                                                    .map(
                                                                        (r) =>
                                                                            r
                                                                                .spp
                                                                                .jumlah_bayar
                                                                    )
                                                                    .reduce(
                                                                        (
                                                                            a,
                                                                            b
                                                                        ) =>
                                                                            a +
                                                                            b
                                                                    )
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        "."
                                                                    )}
                                                        </td>
                                                        <td
                                                            className={`py-2 px-4 whitespace-nowrap ${
                                                                Thead[9].checked
                                                                    ? ""
                                                                    : "hidden"
                                                            }`}
                                                        >
                                                            {
                                                                d.data[0]
                                                                    .created_at
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr className="bg-white text-slate-700 text-center border-b border-slate-300">
                                                    <td
                                                        className="py-2 px-4 whitespace-nowrap"
                                                        colSpan="10"
                                                    >
                                                        Data Kosong
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
