import axiosInstance from "@/lib/axios-instance";
import { QUERY_KEYS } from ".";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateFileRequest, IFileDetailsResponse, IFilesDetailsRequest, IFilesListRequest, IFilesListResponse } from "@/@types/files";

const URI = "api/files";

// (POST) - create a new file - (CREATE)
export const fileCreation = async (payload: ICreateFileRequest) => {
  const res = await axiosInstance.post(`${URI}`, payload);
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
}

export const useFileCreation = () => {
  return useMutation({
    mutationFn: (payload: ICreateFileRequest) => fileCreation(payload),
  });
};

// (GET) - list of files by userId
export const getFileListByUserId = async (payload: IFilesListRequest): Promise<IFilesListResponse> => {
    const res = await axiosInstance.post(`${URI}/list`, payload);

    if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
}

export const useFileListByUserId = (payload: IFilesListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE,payload?.OwnerId],
    queryFn: () => getFileListByUserId(payload),
    enabled: !!payload?.OwnerId,
  });
};

// (GET) - file details by fileId and userId
export const getFileDetailsByUserId = async (payload: IFilesDetailsRequest): Promise<IFileDetailsResponse> => {
    const res = await axiosInstance.post(`${URI}/details`, payload);

    if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
}

export const useFileDetailsByUserId = (payload: IFilesDetailsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE, payload?.FileId, payload?.OwnerId],
    queryFn: () => getFileDetailsByUserId(payload),
    enabled: !!payload?.FileId && !!payload?.OwnerId,
  });
};