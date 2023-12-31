import Layout from "@/Layouts/Layout";
import cardProps from "@/utils/cardProps";
import { barChart, pieChart } from "@/utils/statistics-charts-data";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { gsap } from "gsap";
import moment from "moment";
import { createElement, useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

export default function DashboardAdmin(data) {
    const card = useRef(null);

    const option = {
        options: {
            chart: {
                type: "pie",
            },
            labels: ["Lunas", "Belum Lunas"],
            title: {
                text: "Data SPP bulan sekarang",
                style: {
                    color: "white",
                    fontSize: 20,
                },
            },
        },
        series: [data.data[4][1], data.data[4][0]],
    };

    cardProps[0].value = data.siswa.length;
    cardProps[0].updated =
        "last updated " + moment(data.siswa[0].created_at).fromNow();

    const pemasukanPerHari = data.data
        ? data.data[0]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : 0;
    const pemasukanPerBulan = data.data
        ? data.data[1]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : 0;
    const saldo = data.data
        ? data.data[2]?.saldo
            ? data.data[2]?.saldo
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            : 0
        : 0;

    cardProps[1].value = "Rp." + pemasukanPerHari;
    cardProps[2].value = "Rp." + pemasukanPerBulan;
    cardProps[3].value = "Rp." + saldo;
    cardProps[1].updated =
        "last updated " + moment(data.data[2].created_at).fromNow();
    cardProps[2].updated =
        "last updated " + moment(data.data[2].created_at).fromNow();
    cardProps[3].updated =
        "last updated " + moment(data.data[2].created_at).fromNow();

    useEffect(() => {
        gsap.from(card.current, {
            y: 30,
            duration: 0.5,
            opacity: 0,
        });
    }, []);
    return (
        <>
            <Head title="Dashboard" />
            <Layout auth={data.auth}>
                <div className="p-5" ref={card}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                        {cardProps.map((d, i) => (
                            <Card key={i}>
                                <CardHeader
                                    className="w-min py-4 px-5"
                                    shadow
                                    color={d.color}
                                    variant="gradient"
                                >
                                    {createElement(d.icon, {
                                        className: "w-6 h-6",
                                    })}
                                </CardHeader>
                                <CardBody className="flex flex-col items-end -mt-5 overflow-hidden">
                                    <Typography variant="paragraph">
                                        {d.title}
                                    </Typography>
                                    <Typography variant="h4">
                                        {d.value}
                                    </Typography>
                                </CardBody>
                                <CardFooter divider className="py-3">
                                    <Typography variant="small">
                                        {d.updated}
                                    </Typography>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="pt-5 pb-20 grid grid-cols-2 gap-5">
                        <Card color="blue">
                            <CardBody>
                                <Chart
                                    {...barChart}
                                    series={[
                                        {
                                            name: "Pemasukan",
                                            data: data.data[3],
                                        },
                                    ]}
                                />
                            </CardBody>
                        </Card>
                        <Card color="blue">
                            <CardBody>
                                <Chart
                                    type="donut"
                                    width="400"
                                    options={option.options}
                                    series={option.series}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Layout>
        </>
    );
}
