import { setUserEmpty } from "@/redux/slices/userSlice";
import { store } from "@/redux/store";
import { refresh } from "@/services/auth";
import axios from "axios";

export const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI!

const axiosInstance = axios.create({
  baseURL: BACKEND_URI,
  timeout: 8000,
//   headers: {'X-Custom-Header': 'foobar'}
  withCredentials: true,
})

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refresh();            
        return axiosInstance(originalRequest); 
      } catch {
        store.dispatch(setUserEmpty());     
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;
