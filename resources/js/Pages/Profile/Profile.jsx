import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { PiPencil } from "react-icons/pi";

export default function Profile({ auth, title }) {
    const card = useRef(null);

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
                                    <img src="/img/user.png" alt="" />
                                </div>
                                <div className="flex flex-col w-full justify-between">
                                    <Typography variant="h4" color="black">
                                        {auth.user.name}
                                    </Typography>
                                    <Typography variant="paragraph">
                                        {auth.user.role}
                                    </Typography>
                                    <Typography variant="paragraph">
                                        Nis : {auth.user.nis}
                                    </Typography>
                                    <Typography variant="paragraph">
                                        Password : *******
                                    </Typography>
                                    <Link href={route("profile.change")}>
                                        <Button
                                            color="blue"
                                            variant="outlined"
                                            className="flex justify-center items-center gap-1"
                                            fullWidth
                                        >
                                            <PiPencil className="w-5 h-5" />
                                            Ganti Password
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </Layout>
        </>
    );
}
