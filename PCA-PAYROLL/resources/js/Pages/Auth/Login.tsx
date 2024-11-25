import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });

    // Set action for the Form
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    // console.log(usePage());

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="py-5">
                <header className="flex justify-center">
                    <img
                        src="/PCARASTERlogo.png"
                        alt="PCA LOGO"
                        className="w-72"
                    />
                </header>

                <form onSubmit={submit}>
                    <div>
                        <Label
                            htmlFor="email"
                            className={errors.email && "text-red-600"}
                        >
                            Email
                        </Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={errors.email && "text-red-600"}
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <Label
                            htmlFor="password"
                            className={errors.password && "text-red-600"}
                        >
                            Password
                        </Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className={errors.password && "text-red-600"}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-5 flex">
                        <Button
                            className="w-full flex justify-center h-10"
                            disabled={processing}
                        >
                            Log in
                        </Button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
