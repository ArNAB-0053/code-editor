import {
  IGetShareByMeDataRequest,
  IGetShareWithMeDataRequest,
  IShareByMeRes,
  IShareDataModel,
  IShareModel,
  IShareRequest,
  IShareWithMeRes,
} from "@/@types/share";
import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

const URI = "api/share";

// CREATE a share snapshot
export const createShare = async (
  payload: IShareRequest
): Promise<IShareModel> => {
  const res = await axiosInstance.post(URI, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useCreateShare = () => {
  return useMutation({
    mutationFn: (payload: IShareRequest) => createShare(payload),
  });
};

// GET the snapshot data
export const getSharedWithMeDataDetails = async (
  payload: IGetShareWithMeDataRequest
): Promise<IShareWithMeRes> => {
  const res = await axiosInstance.post(`${URI}/data/with-me`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data.data;
};

export const useSharedWithMeDataDetails = (payload: IGetShareWithMeDataRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE, payload?.ShareId],
    queryFn: () => getSharedWithMeDataDetails(payload),
    enabled: !!payload?.ShareId,
  });
};

// GET Shares - Share To Me
export const getShareToMeList = async (userId: string): Promise<IShareDataModel[]> => {
  const res = await axiosInstance.post(`${URI}/share-to-me`, { userId });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data.data;
};

export const useShareToMeList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE_TO_ME, userId],
    queryFn: () => getShareToMeList(userId),
    enabled: !!userId,
  });
};

// GET Shares - Share By Me
export const getShareByMeList = async (userId: string): Promise<IShareByMeRes[]> => {
  const res = await axiosInstance.post(`${URI}/share-by-me`, { userId });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data.data;
};

export const useShareByMeList = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE_BY_ME, userId],
    queryFn: () => getShareByMeList(userId),
    enabled: !!userId,
  });
};

export const getSharedByMeDataDetails = async (
  payload: IGetShareByMeDataRequest
): Promise<IShareByMeRes> => {
  const res = await axiosInstance.post(`${URI}/data/by-me`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data.data;
};

export const useSharedByMeDataDetails = (payload: IGetShareByMeDataRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE, payload?.SharedId],
    queryFn: () => getSharedByMeDataDetails(payload),
    enabled: !!payload?.SharedId,
  });
};