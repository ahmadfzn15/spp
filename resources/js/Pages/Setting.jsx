import Layout from "@/Layouts/Layout";
import { accentColor, useSetting } from "@/utils/settings";
import { Head, Link } from "@inertiajs/react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Input,
    List,
    ListItem,
    Radio,
    Spinner,
    Switch,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BsChevronRight, BsPlus } from "react-icons/bs";
import { FaCog, FaEdit } from "react-icons/fa";

export default function Setting({ auth, title }) {
    const refresh = useRef();
    const logo = useRef();
    const [status, setStatus] = useState(false);
    const [profile, setProfile] = useState(false);
    const [personalisasi, setPersonalisasi] = useState(false);
    const [editable, setEditable] = useState(false);
    const [logoImage, setLogoImage] = useState();
    const refreshPage = () => {
        refresh.current.click();
    };
    const { color, sidebar, setBarRight, setBarLeft, setColor } = useSetting();
    const [field, setField] = useState({
        logo: "",
        nama_instansi: "",
        slogan: "",
        email: "",
        no_telepon: "",
        alamat: "",
        copyright: "",
    });

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/setting");
            setField(res.data);
        };

        getData();
    }, [status]);

    const changeLogo = (e) => {
        setLogoImage(URL.createObjectURL(e.target.files[0]));
        setField({ ...field, logo: e.target.files[0] });
    };

    const editProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("logo", field.logo);
        formData.append("nama_instansi", field.nama_instansi);
        formData.append("slogan", field.slogan);
        formData.append("email", field.email);
        formData.append("no_telepon", field.no_telepon);
        formData.append("alamat", field.alamat);
        formData.append("copyright", field.copyright);

        const res = await axios.put("/api/setting", formData);
        if (res.status == 200) {
            setStatus(!status);
        }
    };

    const updateBar = () => {
        if (sidebar == "true") {
            setBarLeft();
            refreshPage();
        } else {
            setBarRight();
            refreshPage();
        }
    };

    return (
        <>
            <Head title={title} />
            <Layout auth={auth}>
                <Link href={route("setting")} ref={refresh}></Link>
                <Card className="mt-5">
                    <CardHeader className="py-3 px-5" color={color}>
                        <Typography
                            variant="h5"
                            className="flex items-center gap-2"
                        >
                            Setting <FaCog className="w-6 h-6" />
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <List className="space-y-2">
                            {auth.user.role == "admin" && (
                                <Accordion
                                    open={profile}
                                    icon={
                                        <BsChevronRight
                                            className={`w-5 h-5 ${
                                                profile
                                                    ? "rotate-90"
                                                    : "rotate-0"
                                            } transition-all`}
                                        />
                                    }
                                >
                                    <ListItem
                                        onClick={() => {
                                            if (!editable) {
                                                setProfile(!profile);
                                            }
                                        }}
                                        className={`flex justify-between border border-slate-300 ${
                                            profile ? "rounded-b-none" : ""
                                        }`}
                                    >
                                        <AccordionHeader className="p-0 border-none">
                                            <Typography>
                                                Profil Sekolah
                                            </Typography>
                                        </AccordionHeader>
                                    </ListItem>
                                    <AccordionBody className="px-3 flex flex-col border border-slate-300 rounded-b-lg border-t-none">
                                        <Button
                                            variant={
                                                editable ? "gradient" : "text"
                                            }
                                            color={color}
                                            className="flex items-center gap-1 self-end"
                                            onClick={() =>
                                                setEditable(!editable)
                                            }
                                        >
                                            <FaEdit className="w-4 h-4" />
                                            <h1>Edit</h1>
                                        </Button>
                                        <form onSubmit={editProfile}>
                                            <div className="-mt-3 flex flex-col gap-7">
                                                <div className="space-y-2">
                                                    <Typography variant="small">
                                                        Logo Instansi
                                                    </Typography>
                                                    <div
                                                        className="w-52 h-52 border border-slate-300 rounded-lg flex justify-center items-center cursor-pointer overflow-hidden relative group"
                                                        onClick={() => {
                                                            if (!logoImage) {
                                                                logo.current.click();
                                                            }
                                                        }}
                                                    >
                                                        {logoImage ? (
                                                            <>
                                                                <img
                                                                    src={
                                                                        logoImage
                                                                    }
                                                                />
                                                                <div className="absolute transition-all w-0 group-hover:w-full h-full bg-black/60 flex justify-center items-center">
                                                                    <h1
                                                                        className="text-slate-200 group-hover:block hidden text-lg"
                                                                        onClick={() =>
                                                                            logo.current.click()
                                                                        }
                                                                    >
                                                                        Ubah
                                                                        gambar
                                                                    </h1>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <BsPlus className="w-20 h-20" />
                                                        )}
                                                    </div>
                                                </div>
                                                <input
                                                    ref={logo}
                                                    type="file"
                                                    name="logo"
                                                    className="hidden"
                                                    disabled={!editable}
                                                    onChange={(e) =>
                                                        changeLogo(e)
                                                    }
                                                />
                                                <Input
                                                    variant="standard"
                                                    label="Nama Instansi"
                                                    value={field.nama_instansi}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            nama_instansi:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                <Input
                                                    variant="standard"
                                                    label="Slogan"
                                                    value={field.slogan}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            slogan: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <Input
                                                    variant="standard"
                                                    label="Nomor Telepon"
                                                    value={field.no_telepon}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            no_telepon:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                <Input
                                                    type="email"
                                                    variant="standard"
                                                    label="Email"
                                                    value={field.email}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            email: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <Input
                                                    variant="standard"
                                                    label="Alamat"
                                                    value={field.alamat}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            alamat: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <Input
                                                    variant="standard"
                                                    label="Copyright di footer"
                                                    value={field.copyright}
                                                    color={color}
                                                    readOnly={!editable}
                                                    onChange={(e) =>
                                                        setField({
                                                            ...field,
                                                            copyright:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                                {editable && (
                                                    <Button
                                                        type="submit"
                                                        color={color}
                                                        variant="gradient"
                                                        className="self-end"
                                                    >
                                                        Update
                                                    </Button>
                                                )}
                                            </div>
                                        </form>
                                    </AccordionBody>
                                </Accordion>
                            )}
                            <Accordion
                                open={personalisasi}
                                icon={
                                    <BsChevronRight
                                        className={`w-5 h-5 ${
                                            personalisasi
                                                ? "rotate-90"
                                                : "rotate-0"
                                        } transition-all`}
                                    />
                                }
                            >
                                <ListItem
                                    onClick={() =>
                                        setPersonalisasi(!personalisasi)
                                    }
                                    className={`flex justify-between border border-slate-300 ${
                                        personalisasi ? "rounded-b-none" : ""
                                    }`}
                                >
                                    <AccordionHeader className="p-0 border-none">
                                        <Typography>Personalisasi</Typography>
                                    </AccordionHeader>
                                </ListItem>
                                <AccordionBody className="px-3 flex flex-col border border-slate-300 rounded-b-lg border-t-none">
                                    <ListItem className="flex justify-between">
                                        <Typography>Warna</Typography>
                                        <div className="flex gap-5">
                                            {accentColor.map((d, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-7 h-7 bg-${d}-500 rounded-full ${
                                                        d == color &&
                                                        `ring-4 ring-${d}-500 ring-offset-2`
                                                    }`}
                                                    onClick={() => {
                                                        setColor(d),
                                                            refreshPage();
                                                    }}
                                                ></div>
                                            ))}
                                        </div>
                                    </ListItem>
                                    <ListItem className="flex justify-between">
                                        <Typography>Right Bar</Typography>
                                        <Switch
                                            checked={
                                                localStorage.getItem(
                                                    "sidebar"
                                                ) == "true"
                                            }
                                            onChange={updateBar}
                                            color="blue"
                                        />
                                    </ListItem>
                                </AccordionBody>
                            </Accordion>
                        </List>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
