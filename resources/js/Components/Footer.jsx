import { Typography } from "@material-tailwind/react";

export default function Footer() {
    return (
        <>
            <footer className="w-full relative bottom-0 text-center bg-slate-300 px-10 py-4">
                <Typography
                    variant="paragraph"
                    className="font-semibold text-slate-800"
                >
                    Copyright © 2023 AL Group
                </Typography>
            </footer>
        </>
    );
}
