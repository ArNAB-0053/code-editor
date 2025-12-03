"use client";

import axiosInstance, { BACKEND_URI } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";
import { IProfileDetails } from "@/@types/_base";

export const getMyProfile = async (): Promise<IProfileDetails> => {
  const res = await axiosInstance.get(`api/user/me`);
  return res.data;
};
export const useMyProfile = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: () => getMyProfile(),
  });
};
export const getProfileDetailsByUserId = async (userId: string) => {
  const res = await axiosInstance.get(`api/user/${userId}`);
  return res.data;
};
export const useGetProfileDetailsByUserId = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE, userId],
    queryFn: () => getProfileDetailsByUserId(userId),
    enabled: !!userId,
  });
};
