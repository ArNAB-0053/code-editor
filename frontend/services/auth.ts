import axiosInstance from "@/lib/axios-instance";
import { LoginFormType, RegisterFormType } from "@/zod/sign-up.z";

const URI = "api/auth"

export const register = async (config: RegisterFormType) => {
    const res = await axiosInstance.post(`${URI}/register`, config)

    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    return res.data


//   const res = await fetch(BACKEND_URI, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ code }),
//   });

//   if (!res.ok) {
//     const txt = await res.text();
//     throw new Error(`HTTP ${res.status}: ${txt}`);
//   }

//   const op = await res.json();
//   return op.output ?? ""

};

export const login = async (config: LoginFormType) => {
    const res = await axiosInstance.post(`${URI}/signin`, config)

    if(!res.data) {
        const txt = await res.statusText;
        throw new Error(`HTTP ${res.status}: ${txt}`);
    }

    return res.data
};