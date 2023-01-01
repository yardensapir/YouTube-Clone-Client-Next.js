import { AxiosError } from "axios"
import { useMutation } from "react-query"
import { login } from "../api"
import { showNotification} from "@mantine/notifications";
import { Button, Paper, TextInput, PasswordInput, Stack, Title } from "@mantine/core";
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


    const mutation = useMutation<string, AxiosError, Parameters<typeof login>["0"]>(login, {
        onSuccess: () => {
            router.push("/")
        },

        onError: () => {
            showNotification({
                id: "login",
                title: "Invalid email or password",
                message: "Could not login",
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

