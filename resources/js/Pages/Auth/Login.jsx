import { Head, Link } from "@inertiajs/react";
import Auth from "@/Layouts/Auth";
import { HiComputerDesktop, HiUserGroup } from "react-icons/hi2";

export default function Login({ status, canResetPassword }) {
    return (
        <Auth>
            <Head title="Log in" />
            <div className="flex gap-10 drop-shadow-[0_0_10rem_#172554]">
                <Link href={route("login-admin")}>
                    <div className="py-10 px-20 rounded-lg bg-slate-100 border border-slate-400/50 shadow-md shadow-teal-600 flex flex-col items-center text-teal-500 active:shadow-none">
                        <HiComputerDesktop className="w-20 h-20" />{" "}
                        <h1 className="text-lg font-semibold">Login Admin</h1>
                    </div>
                </Link>
                <Link href={route("login-siswa")}>
                    <div className="py-10 px-20 rounded-lg bg-slate-100 border border-slate-400/50 shadow-md shadow-teal-600 flex flex-col items-center text-teal-500 active:shadow-none">
                        <HiUserGroup className="w-20 h-20" />{" "}
                        <h1 className="text-lg font-semibold">Login Siswa</h1>
                    </div>
                </Link>
            </div>
        </Auth>
    );
}
