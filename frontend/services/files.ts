import axiosInstance from "@/lib/axios-instance";
import { QUERY_KEYS } from ".";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  IBreadcrumbsRes,
  IChildrenResponce,
  ICreateFileRequest,
  IFileCodeResponse,
  IFileDetailsResponse,
  IFileRenameRequest,
  IFilesDetailsRequest,
  IFilesListRequest,
  IFilesListResponse,
  IHardDeleteParams,
  IParentId,
  ISoftDeleteParams,
  ISoftDeleteRequest,
  IUpdateFilesCodeRequest,
  IUpdateFilesOutputRequest,
} from "@/@types/files";
import { IBaseReturn } from "@/@types/_base";
import { useDispatch } from "react-redux";
import { refreshTree, selectFolderId } from "@/redux/slices/fileFolderSlice";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload: ICreateFileRequest) => fileCreation(payload),
    onSuccess: (_res, variable) => {
      const parentId = variable.ParentId ?? null;
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.ParentId ?? null],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, false],
      });
      dispatch(refreshTree(parentId === null ? "root" : parentId));
    },
  });
};

// (GET) - list of files by userId
export const getFileListByUserId = async (
  payload: IFilesListRequest,
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
    queryKey: [
      QUERY_KEYS.FILE,
      payload?.OwnerId,
      payload?.IsDeleted,
      payload?.ParentId,
    ],
    queryFn: () => getFileListByUserId(payload),
    enabled: !!payload?.OwnerId,
  });
};

// (GET) - file details by fileId and userId
export const getFileDetailsByUserId = async (
  payload: IFilesDetailsRequest,
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

// (GET) - file code by fileId and ownerId
export const getFileCode = async (
  payload: IFilesDetailsRequest,
): Promise<IFileCodeResponse> => {
  const res = await axiosInstance.post(`${URI}/details/code`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useFileCode = (payload: IFilesDetailsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE_CODE, payload?.FileId, payload?.OwnerId],
    queryFn: () => getFileCode(payload),
    enabled: !!payload?.FileId && !!payload?.OwnerId,
  });
};

// (GET) - file folder tree
export const getChildren = async (
  parentId: string | null,
): Promise<IChildrenResponce> => {
  const res = await axiosInstance.get(`${URI}/children`, {
    params: {
      parentId,
    },
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useChilren = (parentId: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.FILE, parentId],
    queryFn: () => getChildren(parentId),
  });
};

// (GET) - file folder tree
export const getParentId = async (childId: string): Promise<IParentId> => {
  const res = await axiosInstance.get(`${URI}/parentId`, {
    params: {
      childId,
    },
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useParentId = (childId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.PARENT_ID, childId],
    queryFn: () => getParentId(childId),
    enabled: !!childId,
  });
};

// (PATCH) - Rename
export const renameFile = async (
  payload: IFileRenameRequest,
): Promise<IBaseReturn> => {
  const res = await axiosInstance.patch(`${URI}/rename`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useRenameFile = () => {
  const queryClient = useQueryClient();
  const parentId = useSelector(selectFolderId);
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (payload: IFileRenameRequest) => renameFile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE],
      });
      dispatch(refreshTree(parentId === null ? "root" : parentId));
    },
  });
};

// (PATCH) - Update Code
export const updateFilesCode = async (
  payload: IUpdateFilesCodeRequest,
): Promise<IFileCodeResponse> => {
  const res = await axiosInstance.patch(`${URI}/update/code`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useUpdateFilesCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateFilesCodeRequest) => updateFilesCode(payload),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.FileId],
      });
    },
  });
};

// (PATCH) - Update Output
export const updateFilesCodeOutput = async (
  payload: IUpdateFilesOutputRequest,
): Promise<IBaseReturn> => {
  const res = await axiosInstance.patch(`${URI}/update/output`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useUpdateFilesCodeOutput = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IUpdateFilesOutputRequest) =>
      updateFilesCodeOutput(payload),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.FileId],
      });
    },
  });
};

// (PATCH) - (SOFT DELETE) - Trash / Recycle Bin
export const softDelete = async (
  params: ISoftDeleteParams,
): Promise<IBaseReturn> => {
  const resPayload: ISoftDeleteRequest = {
    FileId: params.FileId,
  };
  const res = await axiosInstance.patch(`${URI}/trash`, resPayload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useSoftDelete = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (params: ISoftDeleteParams) => softDelete(params),
    onSuccess: (_res, variable) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, false],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, variable.OwnerId, true],
      });
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.FILE,
          variable.ParentId === "root" ? null : variable,
        ],
      });
      dispatch(refreshTree(variable.ParentId));
    },
  });
};

// (DELETE) - (HARD DELETE) - Trash / Recycle Bin
export const hardDelete = async (
  params: IHardDeleteParams,
): Promise<IBaseReturn> => {
  const res = await axiosInstance.delete(`${URI}/delete`, {
    params: {
      fileId: params?.FileId,
    },
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useHardDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: IHardDeleteParams) => hardDelete(params),
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

// (DELETE) - (HARD DELETE) - Trash / Recycle Bin
export const hardDeleteAll = async (): Promise<IBaseReturn> => {
  const res = await axiosInstance.delete(`${URI}/delete-all`);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useHardDeleteAll = (ownerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: hardDeleteAll,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, ownerId, false],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.FILE, ownerId, true],
      });
    },
  });
};

// (PATCH) - Restore from Trash / Recycle Bin
export const restore = async (
  payload: ISoftDeleteRequest,
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

// (GET) - Breadcrumbs
export const getBreadcrumbs = async (
  folderId: string,
): Promise<IBreadcrumbsRes> => {
  const res = await axiosInstance.get(`${URI}/get-breadcrumbs`, {
    params: {
      folderId: folderId,
    },
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useBreadcrumbs = (folderId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BREADCRUMB, folderId],
    queryFn: () => getBreadcrumbs(folderId!),
    enabled: !!folderId,
    staleTime: 5 * 60 * 1000,
  });
};
