import axiosInstance from "@/lib/axios-instance";
import { QUERY_KEYS } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ICreateFileRequest,
  IFileDetailsResponse,
  IFilesDetailsRequest,
  IFilesListRequest,
  IFilesListResponse,
  ISoftDeleteRequest,
} from "@/@types/files";
import { IBaseReturn } from "@/@types/_base";

const URI = "api/files";

// (POST) - create a new file - (CREATE)
export const fileCreation = async (payload: ICreateFileRequest) => {
  const res = await axiosInstance.post(URI, payload);
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
};

export const useFileCreation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ICreateFileRequest) => fileCreation(payload),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, false],
      });
    },
  });
};

// (GET) - list of files by userId
export const getFileListByUserId = async (
  payload: IFilesListRequest
): Promise<IFilesListResponse> => {
  const res = await axiosInstance.post(`${URI}/list`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useFileListByUserId = (payload: IFilesListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE, payload?.OwnerId, payload?.IsDeleted],
    queryFn: () => getFileListByUserId(payload),
    enabled: !!payload?.OwnerId,
  });
};

// (GET) - file details by fileId and userId
export const getFileDetailsByUserId = async (
  payload: IFilesDetailsRequest
): Promise<IFileDetailsResponse> => {
  const res = await axiosInstance.post(`${URI}/details`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useFileDetailsByUserId = (payload: IFilesDetailsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE, payload?.FileId, payload?.OwnerId],
    queryFn: () => getFileDetailsByUserId(payload),
    enabled: !!payload?.FileId && !!payload?.OwnerId,
  });
};

// (PATCH) - (SOFT DELETE) - Trash / Recycle Bin
export const softDelete = async (
  payload: ISoftDeleteRequest
): Promise<IBaseReturn> => {
  const res = await axiosInstance.patch(`${URI}/trash`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useSoftDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ISoftDeleteRequest) => softDelete(payload),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, false],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, true],
      });
    },
  });
};

// (PATCH) - Restore from Trash / Recycle Bin
export const restore = async (
  payload: ISoftDeleteRequest
): Promise<IBaseReturn> => {
  const res = await axiosInstance.patch(`${URI}/restore`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useRestore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ISoftDeleteRequest) => restore(payload),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, true],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, false],
      });
    },
  });
};
