import axiosInstance from "@/lib/axios-instance";
import { queryClient } from "@/providers/queryClientProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

const URI = "api/code";

// RUN CODE
export const runCode = async (payload: any) => {
  const res = await axiosInstance.post(`api/CodeRunner`, payload, {
    withCredentials: true,
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useRunCode = () => {
  return useMutation({
    mutationFn: (payload: any) => runCode(payload),
  });
};

// UPDATE CODE
export const updateCode = async (editorId: string, payload: any) => {
  const res = await axiosInstance.put(`${URI}/update/${editorId}`, payload);
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
};

export const useUpdateCode = () => {
  return useMutation({
    mutationFn: (editorId: string, payload: any) =>
      updateCode(editorId, payload),
  });
};

// UPDATE ONLY OUTPUT
export const updateOutput = async ({
  editorId,
  output,
}: {
  editorId: string;
  output: string;
}) => {
  const res = await axiosInstance.patch(`${URI}/update-output/${editorId}`, {
    output,
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
};

export const useUpdateOutput = () => {
  return useMutation({
    mutationFn: ({ editorId, output }: { editorId: string; output: string }) =>
      updateOutput({ editorId, output }),
  });
};

// GET CODE
export const getCode = async (payload: any) => {
  const res = await axiosInstance.post(`${URI}`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};

export const useGetCode = (payload: any) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CODE, payload.userId, payload.lang],
    queryFn: () => getCode(payload),
    enabled: !!payload.userId && !!payload.lang,
  });
};

// CREATE CODE -> AUTO SAVE also doing creation if doesn't exist but if somewhere hardly needed then can be used this
export const createCode = async (payload: any) => {
  const res = await axiosInstance.post(`${URI}/create`, payload);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};
export const useCreateCode = () => {
  return useMutation({
    mutationFn: (payload: any) => createCode(payload),
  });
};

// AUTO-SAVE -> It will create or update in the DB.
export const autoSaveCode = async (payload: any) => {
  const res = await axiosInstance.post(`${URI}/auto-save`, payload, {
    withCredentials: true,
  });

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};
export const useAutoSaveCode = () => {
  return useMutation({
    mutationFn: (payload: any) => autoSaveCode(payload),
  });
};

// SHARE
export const getSharedCode = async (editorId: string) => {
  const res = await axiosInstance.post(`${URI}/share/${editorId}`);

  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }

  return res.data;
};
export const useSharedCode = (editorId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SHARE, editorId],
    queryFn: () => getSharedCode(editorId),
    enabled: !!editorId
  })
}
