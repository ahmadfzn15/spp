import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { BsSave } from "react-icons/bs";

export default function ChangePassword({ auth, title }) {
    const card = useRef(null);
    const { data, setData, processing, errors, post } = useForm({
        password: "",
        repeatPassword: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.changePassword"));
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
                <div className="">
                    <Card className="mt-5 mx-5" ref={card}>
                        <CardHeader
                            color="blue"
                            className="px-5 py-4 flex items-center gap-2"
                            variant="gradient"
                        >
                            <h1 className="text-white text-xl font-semibold">
                                {title}
                            </h1>
                        </CardHeader>
                        <CardBody>
                            <div className="flex gap-10">
                                <div className="rounded-full overflow-hidden w-[10rem] h-[10rem] flex justify-center items-center ring-2 ring-blue-400 shrink-0">
                                    <img src="/img/lusi.jpeg" alt="" />
                                </div>
                                <form onSubmit={submit} className="w-full">
                                    <div className="flex flex-col w-full justify-between gap-2">
                                        <Input
                                            color="blue"
                                            label="Password baru"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            color="blue"
                                            label="Konfirmasi password"
                                            type="password"
                                            value={data.repeatPassword}
                                            onChange={(e) =>
                                                setData(
                                                    "repeatPassword",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Button
                                            type="Submit"
                                            color="blue"
                                            variant="gradient"
                                            className="flex justify-center items-center gap-1"
                                            fullWidth
                                        >
                                            <BsSave className="w-5 h-5" />
                                            Simpan
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Layout>
        </>
    );
}
