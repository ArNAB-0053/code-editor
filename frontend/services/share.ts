
import { IShareModel, IShareRequest } from "@/@types/share";
import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

const URI = "api/share"

// CREATE a share snapshot
export const createShare = async (payload: IShareRequest): Promise<IShareModel> => {
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
export const getSharedData = async (shareId: string) => {
  const res = await axiosInstance.get(`${URI}/${shareId}`);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data.data;
};

export const useSharedData = (shareId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE, shareId],
    queryFn: () => getSharedData(shareId),
    enabled: !!shareId
  })
};