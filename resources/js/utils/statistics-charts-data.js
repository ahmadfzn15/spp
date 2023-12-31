import chartsConfig from "./charts-config";

export const barChart = {
    type: "bar",
    height: 300,
    options: {
        ...chartsConfig,
        colors: "#fff",
        plotOptions: {
            bar: {
                columnWidth: "50%",
                borderRadius: 3,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "Jue",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ],
        },
    },
};

export const pieChart = {
    type: "pie",
    height: 300,
    series: [30, 20, 40, 5, 10],
    options: {
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    },
};
