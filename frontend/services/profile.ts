"use client";

import axiosInstance from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";
import { IProfileDetails, IProfileDetailsByUsername } from "@/@types/_base";

const API = "api/user"

// PROFILE DETAILS from '/me' API
export const whoIsMe = async (): Promise<IProfileDetails> => {
  const res = await axiosInstance.get(`api/user/me`);
  return res.data;
};
export const useMyDetails = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: () => whoIsMe(),
  });
};

// GET PROFILE DETAILS based on USERID
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

// GET PROFILE DETAILS based on USERNAME
export const getProfileDetailsByUsername = async (username: string): Promise<IProfileDetailsByUsername> => {
  const res = await axiosInstance.get(`${API}/profile-details`, {
    params: {
      username
    }
  });
  return res.data;
};
export const useGetProfileDetailsByUsername = (username: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PROFILE, username],
    queryFn: () => getProfileDetailsByUsername(username),
    enabled: !!username,
  });
};
