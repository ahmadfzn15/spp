import Layout from "@/Layouts/Layout";
import { Head, Link } from "@inertiajs/react";
import {
    ButtonGroup,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { BsChevronLeft, BsReceipt } from "react-icons/bs";
import Kwitansi from "./Kwitansi";
import { HiPrinter } from "react-icons/hi2";
import { FaDownload } from "react-icons/fa";

export default function DetailKwitansi(data) {
    const card = useRef(null);

    useEffect(() => {
        gsap.from(card.current, {
            y: 30,
            duration: 0.5,
            opacity: 0,
        });
    }, []);

    return (
        <>
            <Head title={data.title} />
            <Layout auth={data.auth}>
                <Card className="mt-5 shadow-lg" ref={card}>
                    <CardHeader
                        color="blue"
                        className="px-5 py-4 flex items-center gap-2"
                    >
                        <Link href={route("history.index")}>
                            <IconButton variant="text" color="white" size="sm">
                                <BsChevronLeft className="w-6 h-6" />
                            </IconButton>
                        </Link>
                        <Typography
                            variant="h5"
                            className="flex items-center gap-2"
                        >
                            Kwitansi
                            <BsReceipt className="w-5 h-5" />
                        </Typography>
                    </CardHeader>
                    <CardBody className="">
                        <div className="shadow-lg shadow-slate-400 rounded-lg p-5 relative">
                            <div className="absolute right-5">
                                <ButtonGroup color="blue">
                                    <Tooltip
                                        content="Download Pdf Kwitansi"
                                        className="rounded-lg"
                                    >
                                        <IconButton
                                            color="blue"
                                            className="rounded-r-none"
                                        >
                                            <FaDownload className="w-4 h-4" />
                                        </IconButton>
                                    </Tooltip>
                                    <Link
                                        href={route(
                                            "kwitansi.cetak",
                                            data.data[2]
                                        )}
                                    >
                                        <Tooltip content="Cetak Kwitansi">
                                            <IconButton
                                                color="blue"
                                                className="rounded-l-none"
                                            >
                                                <HiPrinter className="w-4 h-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </ButtonGroup>
                            </div>
                            <Kwitansi data={data.data} />
                        </div>
                    </CardBody>
                </Card>
            </Layout>
        </>
    );
}
