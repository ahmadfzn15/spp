import Navbar from "@/Components/Navbar";

export default function Layout({ children, auth }) {
    const bar = localStorage.getItem("sidebar");
    const color = localStorage.getItem("color");
    return (
        <div
            className={`overflow-hidden bg-slate-200 selection:bg-${color}-500`}
        >
            <Navbar auth={auth.user} />
            <div
                className={`lg:w-[calc(100vw-13rem)] ${
                    bar == "true" ? "lg:ml-0" : "lg:ml-[13rem]"
                } mt-16`}
            >
                <main className="w-full flex flex-col justify-between mx-auto h-[90vh] overflow-y-scroll table-siswa">
                    <div className="py-5 px-4">{children}</div>
                </main>
            </div>
        </div>
    );
}
