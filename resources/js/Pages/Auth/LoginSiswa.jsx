import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Checkbox, Input, Typography } from "@material-tailwind/react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function LoginSiswa({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nis: "",
        password: "",
        remember: false,
        role: "siswa",
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout errors={errors}>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <Input
                        type="text"
                        label="Nis"
                        color="blue"
                        value={data.nis}
                        onChange={(e) => setData("nis", e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <Input
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        color="blue"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        icon={
                            showPassword ? (
                                <HiEye
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <HiEyeSlash
                                    className="w-5 h-5 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )
                        }
                    />
                </div>

                <div className="block my-4">
                    <Checkbox label="Remember me" color="blue" />
                </div>

                <div className="space-y-3">
                    <Button
                        color="blue"
                        fullWidth
                        type="submit"
                        disabled={processing}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
