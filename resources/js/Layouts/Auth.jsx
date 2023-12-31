import { Link } from "@inertiajs/react";

export default function Auth({ children }) {
    return (
        <>
            <div className="w-screen h-screen bg-slate-900 flex flex-col items-center pt-16 gap-5">
                <img src="/img/logo.png" alt="Abroor" className="w-52" />
                <div className="">
                    <main>{children}</main>
                </div>
                {/* <div className="w-[25vw] ml-[21vw] h-screen bg-slate-900 -skew-x-[25deg] absolute"></div> */}
                {/* <div className="w-[65vw] h-screen bg-[url('/img/abroor.png')] bg-no-repeat bg-cover bg-right"></div> */}
            </div>
        </>
    );
}
