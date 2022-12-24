import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { registerUser } from "../api"
import { showNotification, updateNotification } from "@mantine/notifications";
import { Button, Paper, TextInput, PasswordInput, Stack, Center, Title } from "@mantine/core";
import Head from "next/head";
import { useForm } from "@mantine/form";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";


export default function LoginPage() {

    const router = useRouter()

    const form = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });


    const mutation = useMutation<string, AxiosError, Parameters<typeof registerUser>["0"]>(registerUser, {
        onMutate: () => {
            showNotification({
                id: "login",
                title: "Creating account",
                message: "Please wait...",
                loading: true,
            });
        },
        onSuccess: () => {
            updateNotification({
                id: "login",
                title: "Success",
                message: "Successfully created account",
            })
            router.push("/auth/login")
        },
        onError: () => {
            updateNotification({
                id: "register",
                title: "Error",
                message: "Could not create account",
            })
        }

    });



    return (
        <>

            <Head>
                <title>Login Page</title>
            </Head>

            <main className={styles.register_form}>

                <Paper >
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>

                        <Title>
                            Wellcome Back 👋
                        </Title>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="Please Enter Your Email"
                                required
                                {...form.getInputProps("email")} />

                            <PasswordInput
                                label="Password"
                                placeholder="Please Enter Your Password"
                                required
                                {...form.getInputProps("password")} />



                            <Button type="submit">Login</Button>
                        </Stack>
                    </form>
                </Paper>

            </main>



        </>
    )

}

