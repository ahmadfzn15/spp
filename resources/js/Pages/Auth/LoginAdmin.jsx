import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

export default function LoginAdmin({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
        role: "admin",
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

            <form onSubmit={submit} className="space-y-3">
                <div>
                    <Input
                        type="text"
                        label="Username"
                        color="blue"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        error={errors.username}
                    />
                </div>

                <div>
                    <Input
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        color="blue"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        error={errors.password}
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

                <div className="block my-3">
                    <Checkbox label="Remember me" color="blue" />
                </div>

                <div className="flex flex-col space-y-3">
                    <Button
                        color="blue"
                        fullWidth
                        type="submit"
                        disabled={processing}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
