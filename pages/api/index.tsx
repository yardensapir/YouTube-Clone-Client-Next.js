import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT

const userBase = `${base}api/users`
const authBase = `${base}api/auth`
const videoBase = `${base}api/videos`
export function registerUser(payload: {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
}
) {

    const response = axios.post(userBase, payload).then((res) => res.data)
    return response
}

export function login(payload: {
    email: string,
    password: string

}) {
    const response = axios.post(authBase, payload, { withCredentials: true }).then((res) => res.data)
    return response

}


export function getMe() {
    const response = axios.get(userBase, { withCredentials: true }).then((res) => res.data).catch(() => {
        return null
    })
    return response

}



