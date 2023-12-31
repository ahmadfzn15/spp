import {
    HiArrowRightOnRectangle,
    HiBars3,
    HiBell,
    HiChevronRight,
    HiEye,
    HiQuestionMarkCircle,
    HiXMark,
} from "react-icons/hi2";
import { BsDatabaseFill } from "react-icons/bs";
import { SlEnvolopeLetter } from "react-icons/sl";
import { FaCog, FaMoneyBill, FaMoneyBillWaveAlt } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import {
    MdClass,
    MdDashboard,
    MdDateRange,
    MdHistory,
    MdPayments,
} from "react-icons/md";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
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
import { useEffect, useState } from "react";
import { useSetting } from "@/utils/settings";
import { getSetting } from "@/utils/getSetting";
import axios from "axios";

export default function Navbar({ auth }) {
    const [master, setMaster] = useState(
        route().current("siswa*") ||
            route().current("spp*") ||
            route().current("periode*") ||
            route().current("kelas*") ||
            false
    );
    const [keuangan, setKeuangan] = useState(
        route().current("tabungan") || route().current("utang") || false
    );
    const { color } = useSetting();

    const [admin, setAdmin] = useState(auth.role == "admin");
    const [nav, setNav] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [notif1, setNotif1] = useState(false);
    const [notif2, setNotif2] = useState(false);
    const [bar, setBar] = useState("");
    const [pembayaran, setPembayaran] = useState(null);
    const [setting, setSetting] = useState({});

    const signOut = () => setLogoutDialog(!logoutDialog);

    useEffect(() => {
        const { sidebar } = useSetting();
        setBar(sidebar);

        if (auth.role == "admin") {
            const getPembayaran = async () => {
                const res = await axios.get("/api/pembayaran/belum-lunas");
                if (res.status == 200) {
                    setPembayaran(res.data);
                }
            };

            getPembayaran();
        }
    }, []);

    const { post } = useForm();
    const trigger1 = {
        onMouseEnter: () => setNotif1(true),
        onMouseLeave: () => setNotif1(false),
    };
    const trigger2 = {
        onMouseEnter: () => setNotif2(true),
        onMouseLeave: () => setNotif2(false),
    };

    const logout = (e) => {
        e.preventDefault();

        post(route("logout"));
        signOut();
    };

    useEffect(() => {
        if (!localStorage.getItem("Setting")) {
            const get = async () => {
                const data = await getSetting();
                setSetting(data);
            };

            get();
        }
    }, []);

    return (
        <>
            <nav className="w-screen h-16 bg-slate-900 px-10 font-semibold flex items-center justify-between fixed">
                <Link href="/" className="text-slate-300 text-2xl">
                    {setting?.nama_instansi ? (
                        "SPP " + setting.nama_instansi
                    ) : (
                        <Spinner color={color} />
                    )}
                </Link>
                <div className="flex gap-5 items-center">
                    <Tooltip content="Panduan">
                        <Link href={route("help")}>
                            <HiQuestionMarkCircle className="w-7 h-7 text-slate-300 hover:text-white" />
                        </Link>
                    </Tooltip>
                    <Menu
                        animate={{
                            mount: { y: 0, opacity: 1 },
                            unmount: { y: 20, opacity: 0 },
                        }}
                        open={notif2}
                    >
                        <MenuHandler {...trigger2}>
                            <div className="cursor-pointer flex gap-3">
                                <div
                                    className={`w-8 h-8 rounded-full overflow-hidden ring-2 ring-${color}-500 flex justify-center items-center`}
                                >
                                    <img
                                        src="/img/user.png"
                                        alt="Profile Picture"
                                    />
                                </div>
                                <div className="flex gap-1 items-center text-white font-normal">
                                    <h1 className="text-sm">
                                        {auth.role == "admin"
                                            ? auth.username.split(" ")[0]
                                            : auth.name.split(" ")[0]}
                                    </h1>
                                    <HiChevronRight
                                        className={`w-4 h-4 ${
                                            notif2 ? "rotate-90" : "rotate-0"
                                        } transition-all`}
                                    />
                                </div>
                            </div>
                        </MenuHandler>
                        <MenuList
                            {...trigger2}
                            className="border border-slate-300 p-2.5"
                        >
                            <Link
                                href={route("profile")}
                                className="hover:outline-none focus:outline-none"
                            >
                                <MenuItem className="flex gap-2 text-blue-500 hover:text-blue-600">
                                    <HiEye className="w-4 h-4" />
                                    Profile
                                </MenuItem>
                            </Link>
                            <MenuItem>
                                <div
                                    className="flex gap-2 text-blue-500 hover:text-blue-600"
                                    onClick={signOut}
                                >
                                    <HiArrowRightOnRectangle className="w-4 h-4" />
                                    Sign out
                                </div>
                                <Dialog
                                    open={logoutDialog}
                                    handler={signOut}
                                    className="bg-slate-200"
                                >
                                    <DialogBody className="py-5">
                                        <Typography variant="h4" color="black">
                                            Apakah yakin anda ingin logout?
                                        </Typography>
                                    </DialogBody>
                                    <DialogFooter className="space-x-4">
                                        <Button color="red" onClick={signOut}>
                                            Tidak
                                        </Button>
                                        <form onSubmit={logout}>
                                            <Button type="submit" color="green">
                                                Ya
                                            </Button>
                                        </form>
                                    </DialogFooter>
                                </Dialog>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <IconButton
                        variant="text"
                        color="white"
                        className="lg:hidden block"
                        onClick={() => setNav(!nav)}
                    >
                        {nav ? (
                            <HiXMark className="w-6 h-6" />
                        ) : (
                            <HiBars3 className="w-6 h-6" />
                        )}
                    </IconButton>
                </div>
            </nav>
            <div
                className={`w-[13rem] lg:ml-0 ${
                    nav ? "lg:ml-0" : "-ml-[13rem]"
                } transition-all ${
                    bar == "true" ? "right-0" : "left-0"
                } h-[calc(100vh-4rem)] px-3 pb-3 mt-16 bg-slate-900 fixed flex flex-col gap-2 items-center text-slate-300 z-10 overflow-y-auto`}
            >
                <div className="w-full px-5">
                    <img src="/img/logo.png" alt="" />
                </div>
                <Link href={route("dashboard")} className="w-full">
                    <Button
                        color={color}
                        variant={
                            route().current("dashboard") ? "gradient" : "text"
                        }
                        className="flex gap-2 items-end p-2.5"
                        fullWidth
                    >
                        <MdDashboard className="w-4 h-4 shrink-0" />
                        <h1>Dashboard</h1>
                    </Button>
                </Link>
                {admin ? (
                    <>
                        <div
                            className={`flex flex-col relative w-full overflow-x-hidden table-siswa ${
                                master
                                    ? "bg-slate-800 rounded-lg h-34 transition-all overflow-y-auto"
                                    : "h-10 transition-all overflow-y-hidden"
                            }`}
                        >
                            <div
                                onClick={() => setMaster(!master)}
                                className={`w-full flex justify-between items-center hover:bg-slate-800 p-2 rounded-lg cursor-pointer z-[2] text-${color}-500`}
                            >
                                <div className="flex items-center gap-2">
                                    <BsDatabaseFill className="w-4 h-4 shrink-0" />
                                    <h1 className="whitespace-nowrap">
                                        Master data
                                    </h1>
                                </div>
                                <HiChevronRight
                                    className={`w-4 h-4 ${
                                        master && "rotate-90"
                                    } transition-all`}
                                />
                            </div>
                            <div
                                className={`flex flex-col gap-2 p-2 transition-all`}
                            >
                                <Link
                                    href={route("siswa.index")}
                                    className="w-full"
                                >
                                    <Button
                                        color={color}
                                        variant={
                                            route().current("siswa*")
                                                ? "gradient"
                                                : "text"
                                        }
                                        className="flex gap-2 items-end p-2.5"
                                        fullWidth
                                    >
                                        <PiStudentFill className="w-4 h-4 shrink-0" />
                                        <h1>Data Siswa</h1>
                                    </Button>
                                </Link>
                                <Link
                                    href={route("spp.index")}
                                    className="w-full"
                                >
                                    <Button
                                        color={color}
                                        variant={
                                            route().current("spp*")
                                                ? "gradient"
                                                : "text"
                                        }
                                        className="flex gap-2 items-end p-2.5"
                                        fullWidth
                                    >
                                        <MdPayments className="w-4 h-4 shrink-0" />
                                        <h1>Data SPP</h1>
                                    </Button>
                                </Link>
                                <Link
                                    href={route("kelas.index")}
                                    className="w-full"
                                >
                                    <Button
                                        color={color}
                                        variant={
                                            route().current("kelas*")
                                                ? "gradient"
                                                : "text"
                                        }
                                        className="flex gap-2 items-end p-2.5"
                                        fullWidth
                                    >
                                        <MdClass className="w-4 h-4 shrink-0" />
                                        <h1>Data Kelas</h1>
                                    </Button>
                                </Link>
                                <Link
                                    href={route("periode.index")}
                                    className="w-full"
                                >
                                    <Button
                                        color={color}
                                        variant={
                                            route().current("periode*")
                                                ? "gradient"
                                                : "text"
                                        }
                                        className="flex gap-2 items-end p-2.5 overflow-x-auto scrollbar-x-hidden"
                                        fullWidth
                                    >
                                        <MdDateRange className="w-4 h-4 shrink-0" />
                                        <h1>Periode</h1>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div
                            className={`flex flex-col relative w-full overflow-x-hidden table-siswa ${
                                keuangan
                                    ? "bg-slate-800 rounded-lg h-34 transition-all overflow-y-auto"
                                    : "h-10 transition-all overflow-y-hidden"
                            }`}
                        >
                            <div
                                onClick={() => setKeuangan(!keuangan)}
                                className={`flex justify-between items-center hover:bg-slate-800 p-2 rounded-lg cursor-pointer z-[2] text-${color}-500`}
                            >
                                <div className="flex items-center gap-2">
                                    <FaMoneyBillWaveAlt className="w-4 h-4 shrink-0" />
                                    <h1 className="whitespace-nowrap">
                                        Keuangan
                                    </h1>
                                </div>
                                <HiChevronRight
                                    className={`w-4 h-4 ${
                                        keuangan && "rotate-90"
                                    } transition-all`}
                                />
                            </div>
                            <div
                                className={`flex flex-col gap-2 p-2 transition-all`}
                            >
                                <Link
                                    href={route("tabungan")}
                                    className="w-full"
                                >
                                    <Button
                                        color={color}
                                        variant={
                                            route().current("tabungan*")
                                                ? "gradient"
                                                : "text"
                                        }
                                        className="flex gap-2 items-end p-2.5"
                                        fullWidth
                                    >
                                        <FaMoneyBill className="w-4 h-4 shrink-0" />
                                        <h1>Tabungan</h1>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <Link
                            href={route("pembayaran.index")}
                            className="w-full"
                        >
                            <Button
                                color={color}
                                variant={
                                    route().current("pembayaran*")
                                        ? "gradient"
                                        : "text"
                                }
                                className="flex items-center justify-between p-2.5"
                                fullWidth
                            >
                                <div className="flex gap-2">
                                    <MdPayments className="w-4 h-4 shrink-0" />
                                    <h1>Pembayaran</h1>
                                </div>
                                {pembayaran != 0 && pembayaran != null && (
                                    <Chip
                                        size="sm"
                                        value={pembayaran}
                                        className="rounded-full"
                                        color={
                                            route().current("pembayaran*")
                                                ? ""
                                                : "blue"
                                        }
                                    />
                                )}
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href={route("tagihan.index")} className="w-full">
                            <Button
                                color={color}
                                variant={
                                    route().current("tagihan*")
                                        ? "gradient"
                                        : "text"
                                }
                                className="flex gap-2 items-end p-2.5"
                                fullWidth
                            >
                                <MdPayments className="w-4 h-4 shrink-0" />
                                <h1>Tagihan</h1>
                            </Button>
                        </Link>
                    </>
                )}
                <>
                    <Link href={route("history.index")} className="w-full">
                        <Button
                            color={color}
                            variant={
                                route().current("history*") ||
                                route().current("kwitansi*")
                                    ? "gradient"
                                    : "text"
                            }
                            className="flex gap-2 items-end whitespace-nowrap p-2.5"
                            fullWidth
                        >
                            <MdHistory className="w-4 h-4 shrink-0" />
                            <h1>History Pembayaran</h1>
                        </Button>
                    </Link>
                </>
                <Link href={route("setting")} className="w-full">
                    <Button
                        color={color}
                        variant={
                            route().current("setting*") ? "gradient" : "text"
                        }
                        className="flex gap-2 items-end p-2.5"
                        fullWidth
                    >
                        <FaCog className="w-4 h-4 shrink-0" />
                        <h1>Setting</h1>
                    </Button>
                </Link>
            </div>
        </>
    );
}
