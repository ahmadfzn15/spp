export const chartsConfig = {
    chart: {
        toolbar: {
            show: true,
        },
    },
    title: {
        text: "Data Pemasukan",
        style: {
            color: "white",
            fontSize: 20,
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        axisTicks: {
            show: true,
        },
        axisBorder: {
            show: true,
        },
        labels: {
            style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 300,
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                colors: "#fff",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "dark",
    },
};

export default chartsConfig;
