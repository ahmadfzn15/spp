import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import { Head, Link } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { HiBars3, HiPencil, HiTrash } from "react-icons/hi2";

export default function Periode({ auth, title }) {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(false);
    const [tahunPertama, setTahunPertama] = useState("");
    const [tahunKedua, setTahunKedua] = useState("");
    const card = useRef(null);
    const { color } = useSetting();

    useEffect(() => {
        gsap.from(card.current, {
            y: 40,
            duration: 0.5,
            opacity: 0,
        });
    }, []);

    useEffect(() => {
        const getPeriode = async () => {
            const d = await axios.get("/api/periode");
            setData(d.data);
        };

        getPeriode();
    }, [status]);

    const addPeriode = async () => {
        await axios.post("/api/periode", {
            tahunPertama,
            tahunKedua,
        });
        setTahunPertama("");
        setTahunKedua("");
        setStatus(!status);
    };

    const deletePeriode = async (id) => {
        await axios.delete(`/api/periode/${id}`);
        setStatus(!status);
    };

    return (
        <>
            <Head title={title} />
            <Layout auth={auth}>
                <Card className="mt-5 shadow-lg" ref={card}>
                    <CardHeader color={color} className="px-5 py-4">
                        <Typography variant="h5">Periode</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="grid grid-cols-2 gap-10 mt-10">
                            <div className="space-y-4">
                                <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    No
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Tahun Ajaran
                                                </th>
                                                <th className="py-2 px-4 whitespace-nowrap">
                                                    Opsi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.length != 0 ? (
                                                data?.map((d, i) => (
                                                    <tr
                                                        key={i}
                                                        className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                                    >
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {i + 1}.
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
                                                            {d.tahun_pertama +
                                                                "/" +
                                                                d.tahun_kedua}
                                                        </td>
                                                        <td className="py-2 px-4 whitespace-nowrap">
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
                                                                    <Link
                                                                        href={route(
                                                                            "periode.index",
                                                                            d.id
                                                                        )}
                                                                        className="hover:outline-none focus:outline-none"
                                                                    >
                                                                        <MenuItem className="flex gap-2 px-4 text-green-500 hover:text-green-600">
                                                                            <HiPencil className="w-4 h-4" />
                                                                            Edit
                                                                        </MenuItem>
                                                                    </Link>
                                                                    <MenuItem
                                                                        className="flex gap-2 px-4 text-red-500 hover:text-red-600"
                                                                        onClick={() =>
                                                                            deletePeriode(
                                                                                d.id
                                                                            )
                                                                        }
                                                                    >
                                                                        <HiTrash className="w-4 h-4" />
                                                                        Hapus
                                                                    </MenuItem>
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
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        label="Tahun Pertama"
                                        color="blue"
                                        type="number"
                                        value={tahunPertama}
                                        onChange={(e) =>
                                            setTahunPertama(e.target.value)
                                        }
                                    />
                                    <h1 className="text-3xl">/</h1>
                                    <Input
                                        label="Tahun Kedua"
                                        color="blue"
                                        type="number"
                                        value={tahunKedua}
                                        onChange={(e) =>
                                            setTahunKedua(e.target.value)
                                        }
                                    />
                                </div>
                                <Button
                                    color="blue"
                                    variant="gradient"
                                    fullWidth
                                    onClick={addPeriode}
                                >
                                    Tambah Periode Baru
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
