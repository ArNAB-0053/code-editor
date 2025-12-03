import axiosInstance from "@/lib/axios-instance";
import { LoginFormType, RegisterFormType } from "@/zod/sign-up.z";
import { Axios } from "axios";

export const URI = "api/user"

export const register = async (config: RegisterFormType) => {
    const res = await axiosInstance.post(`${URI}/register`, config)

    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    return res.data
};

export const login = async (config: LoginFormType) => {
    const res = await axiosInstance.post(`${URI}/signin`, config, {
        withCredentials: true
    })

    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    return res.data;
};

export const checkCred = async () => {
    const res = await axiosInstance.get(`${URI}/me`, {
        withCredentials: true
    })
    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`)
    }

    return res.data;
}

export const profile = async (id: string) => {
    const res = await axiosInstance.get(`${URI}/${id}`, {
        withCredentials: true
    })
    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`)
    }

    return res.data;
}

