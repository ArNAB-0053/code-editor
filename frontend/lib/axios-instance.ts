import axios from "axios";

const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI!

const axiosInstance = axios.create({
  baseURL: BACKEND_URI,
  timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;
