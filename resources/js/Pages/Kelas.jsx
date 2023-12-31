import Layout from "@/Layouts/Layout";
import { useSetting } from "@/utils/settings";
import { Head, Link, useForm } from "@inertiajs/react";
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
import { HiBars3, HiPencil, HiPlus, HiTrash } from "react-icons/hi2";

export default function Kelas({ auth, title }) {
    const [data, setData] = useState([]);
    const [kelas, setKelas] = useState("");
    const [status, setStatus] = useState(false);
    const card = useRef(null);
    const { color } = useSetting();

    useEffect(() => {
        const getKelas = async () => {
            const d = await axios.get("/api/kelas");
            setData(d.data);
        };

        getKelas();
    }, [status]);

    const addKelas = async () => {
        await axios.post("/api/kelas", {
            kelas,
        });
        setKelas("");
        setStatus(!status);
    };

    const deleteKelas = async (id) => {
        await axios.delete(`/api/kelas/${id}`);
        setStatus(!status);
    };

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
                        <Typography variant="h5">Kelas</Typography>
                    </CardHeader>
                    <CardBody className="p-5">
                        <div className="w-full space-y-4">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="mt-5">
                                    <div className="overflow-x-auto max-h-[25rem] rounded-lg ring-2 ring-slate-300 table-siswa">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b-2 border-slate-700 bg-slate-800 text-white">
                                                    <th className="py-2 px-4 whitespace-nowrap w-10">
                                                        No
                                                    </th>
                                                    <th className="py-2 px-4 whitespace-nowrap">
                                                        Kelas
                                                    </th>
                                                    <th className="py-2 px-4 whitespace-nowrap">
                                                        Opsi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.length != 0 ? (
                                                    data.map((d, i) => (
                                                        <tr
                                                            key={i}
                                                            className="odd:bg-white even:bg-blue-100 text-slate-700 text-center border-t border-slate-300"
                                                        >
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {i + 1}.
                                                            </td>
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                {d.kelas}
                                                            </td>
                                                            <td className="py-2 px-4 whitespace-nowrap">
                                                                <Menu
                                                                    animate={{
                                                                        mount: {
                                                                            y: 0,
                                                                            opacity: 1,
                                                                        },
                                                                        unmount:
                                                                            {
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
                                                                                "kelas.index",
                                                                                d.id
                                                                            )}
                                                                            className="hover:outline-none focus:outline-none"
                                                                        >
                                                                            <MenuItem className="flex gap-2 px-4 text-green-500 hover:text-green-600">
                                                                                <HiPencil className="w-4 h-4" />
                                                                                Edit
                                                                            </MenuItem>
                                                                        </Link>{" "}
                                                                        <MenuItem
                                                                            className="flex gap-2 px-4 text-red-500 hover:text-red-600"
                                                                            onClick={() =>
                                                                                deleteKelas(
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
                                <div className="space-y-4 mt-5">
                                    <Input
                                        label="Kelas"
                                        color="blue"
                                        value={kelas}
                                        onChange={(e) =>
                                            setKelas(e.target.value)
                                        }
                                    />
                                    <Button
                                        color="blue"
                                        variant="gradient"
                                        fullWidth
                                        onClick={addKelas}
                                    >
                                        Tambah Kelas Baru
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
