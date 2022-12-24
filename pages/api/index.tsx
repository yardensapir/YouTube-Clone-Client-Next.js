import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const userBase = `${base}api/users`

export const registerUser = async (payload: {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}) => {
    try {
        const user = await axios.post(userBase, payload)
        return user.data;

    } catch (error) {

    }
}