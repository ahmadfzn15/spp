import { Link } from "@inertiajs/react";
import { Alert } from "@material-tailwind/react";
import { HiXMark } from "react-icons/hi2";
import { MdError } from "react-icons/md";

export default function Guest({ children, errors }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-900">
            {(errors?.username || errors?.password) && (
                <Alert
                    color="red"
                    variant="gradient"
                    icon={<MdError className="w-5 h-5" />}
                    className="top-0 absolute"
                    animate={{
                        unmount: { y: -50, opacity: 0 },
                        mount: { y: 0, opacity: 1 },
                    }}
                    action={
                        <HiXMark className="w-5 h-5 right-0 absolute mr-3" />
                    }
                >
                    {errors.username || errors.password}
                </Alert>
            )}
            <div className="flex flex-col items-center">
                <img className="w-40" src="/img/logo.png" alt="" />
                {/* <h1 className="text-slate-300 text-3xl">Abroor Kahiji!!</h1> */}
            </div>

            <div className="w-1/3 mt-6 p-6 bg-slate-200 shadow-lg shadow-blue-900 overflow-hidden sm:rounded-lg drop-shadow-[0_0_20rem_#172554]">
                {children}
            </div>
        </div>
    );
}
