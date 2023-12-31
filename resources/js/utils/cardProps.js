import {
    BsCalendar3,
    BsCalendarDayFill,
    BsCalendarMonthFill,
} from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";

const cardProps = [
    {
        icon: PiStudentFill,
        color: "blue",
        title: "Jumlah siswa",
        value: 400,
        updated: "",
    },
    {
        icon: BsCalendarDayFill,
        color: "green",
        title: "Pemasukan hari ini",
        value: "Rp." + 350000,
        updated: "",
    },
    {
        icon: BsCalendarMonthFill,
        color: "blue-gray",
        title: "Pemasukan bulan ini",
        value: "Rp.3.500.000",
        updated: "",
    },
    {
        icon: FaMoneyBillWave,
        color: "red",
        title: "Total Saldo",
        value: "Rp.5.500.000",
        updated: "",
    },
];

export default cardProps;
