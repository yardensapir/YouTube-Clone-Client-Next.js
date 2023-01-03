import axios from "axios";
import { Video } from "../../types";
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

export function uploadVideo({ formData, config }: { formData: FormData, config: { onUploadProgress: (ProgressEvent: any) => void } }) {
    return axios.post(videoBase, formData, {
        withCredentials: true,
        ...config,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((res)=>res.data)
}

export function updateVideo({
    videoId,
    ...payload
  }: {
    videoId: string;
    title: string;
    description: string;
    published: boolean;
  }) {
    return axios.patch<Video>(`${videoBase}/${videoId}`, payload, {
      withCredentials: true,
    });
  }

  export function getVideos(){
    return axios.get(videoBase).then(res=>res.data)
  }
