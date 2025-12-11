import { IAvailability, IAuthReturn, IRegister } from "@/@types/auth";
import axiosInstance from "@/lib/axios-instance";
import { LoginFormType, RegisterFormType } from "@/zod/auth.z";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

export const URI = "api/user";

// ----------------------------------------------------
//                          AUTH 
// ----------------------------------------------------
// SIGN UP
export const register = async (config: RegisterFormType): Promise<IAuthReturn> => {
  const res = await axiosInstance.post(`${URI}/register`, config);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterFormType) => register(payload),
  });
};

// SIGN IN
export const login = async (config: LoginFormType): Promise<IAuthReturn> => {
  const res = await axiosInstance.post(`${URI}/signin`, config, {
    withCredentials: true,
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginFormType) => login(payload),
  });
};

// ----------------------------------------------------
//                    VALIDATION CHECK 
// ----------------------------------------------------
// CHECK USERNAME Exists
export const getUsernameAvailability = async (username: string): Promise<IAvailability> => {
  const res = await axiosInstance.get(`${URI}/check-username`, {
    params: { username },
  });

  return res.data;
};

export const useGetUsernameAvailability = (username: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERNAME_CHECK, username],
    queryFn: () => getUsernameAvailability(username),
    enabled: !!username,
  });
}

// CHECK EMAIL Exists
export const getEmailAvailability = async (email: string): Promise<IAvailability> => {
  const res = await axiosInstance.get(`${URI}/check-email`, {
    params: { email },
  });

  return res.data;
};

export const useGetEmailAvailability = (email: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERNAME_CHECK, email],
    queryFn: () => getEmailAvailability(email),
    enabled: !!email,
  });
};

// ----------------------------------------------------
//                        SEARCH
// ----------------------------------------------------
export const searchByUsername = async (prefix: string) => {
  const res = await axiosInstance.get(`${URI}/search`, {
    params: { username: prefix },
  });
  return res.data;
};

export const useSearchByUsername = (prefix: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH, prefix],
    queryFn: () => searchByUsername(prefix),
    enabled: !!prefix,
  });
};