import axios from "axios";

export const client = axios.create({
        baseURL:import.meta.env.VITE_BASE_URL,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })