import { ISocialModal, ISocialRes } from "@/@types/social";
import axiosInstance from "@/lib/axios-instance";
import { useMutation } from "@tanstack/react-query";

export const URI = "api/social";

export const connectSocial = async (config: ISocialModal): Promise<ISocialRes> => {
  const res = await axiosInstance.post(URI, config);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useConnectSocial = () => {
  return useMutation({
    mutationFn: (payload: ISocialModal) => connectSocial(payload),
  });
};


export async function connectGithub() {
  const res = await fetch("/api/connect/github");
  if (!res.ok) {
    throw new Error("Failed to create repo");
  }
  return res.json();
}