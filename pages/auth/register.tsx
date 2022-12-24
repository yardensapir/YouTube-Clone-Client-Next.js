import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { registerUser } from "../api"
import { showNotification, updateNotification } from "@mantine/notifications";
import { Button, Paper, TextInput, PasswordInput, Stack, Center, Title } from "@mantine/core";
import Head from "next/head";
import { useForm } from "@mantine/form";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";


export default function RgisterPage() {

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
                id: "register",
                title: "Creating account",
                message: "Please wait...",
                loading: true,
            });
        },
        onSuccess: () => {
            updateNotification({
                id: "register",
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
                <title>Register User</title>
            </Head>

            <main className={styles.register_form}>

                <Paper className={styles.paper}>
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>

                        <Title>
                            Let's get started 👋
                        </Title>
                        <Stack>
                            <TextInput
                                label="Email"
                                placeholder="Please Enter Your Email"
                                required
                                {...form.getInputProps("email")} />
                            <TextInput
                                label="User Name"
                                placeholder="Please Enter Your User Name"
                                required
                                {...form.getInputProps("username")} />
                            <PasswordInput
                                label="Password"
                                placeholder="Please Enter Your Password"
                                required
                                {...form.getInputProps("password")} />

                            <PasswordInput
                                label="Confirm Password"
                                placeholder="Please Confirm Your Password"
                                required
                                {...form.getInputProps("confirmPassword")} />

                            <Button type="submit">Subbmit !</Button>
                        </Stack>
                    </form>
                </Paper>

            </main>



        </>
    )

}

