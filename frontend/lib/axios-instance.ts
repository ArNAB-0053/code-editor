import axios from "axios";

export const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI!

const axiosInstance = axios.create({
  baseURL: BACKEND_URI,
  timeout: 8000,
//   headers: {'X-Custom-Header': 'foobar'}
  withCredentials: true,
});

export default axiosInstance;
