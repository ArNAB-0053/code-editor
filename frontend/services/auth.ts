import { IAvailability, ISignInReturn } from "@/@types/auth";
import axiosInstance from "@/lib/axios-instance";
import { LoginFormType, RegisterFormType } from "@/zod/auth.z";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

export const URI = "api/user";

export const register = async (config: RegisterFormType) => {
  const res = await axiosInstance.post(`${URI}/register`, config);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const login = async (config: LoginFormType): Promise<ISignInReturn> => {
  const res = await axiosInstance.post(`${URI}/signin`, config, {
    withCredentials: true,
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const checkCred = async () => {
  const res = await axiosInstance.get(`${URI}/me`, {
    withCredentials: true,
  });
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const profile = async (id: string) => {
  const res = await axiosInstance.get(`${URI}/${id}`, {
    withCredentials: true,
  });
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

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
