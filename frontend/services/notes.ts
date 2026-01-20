import axiosInstance from "@/lib/axios-instance";
import { IGetNoteDetailsRequest, INoteModel, INoteResult } from "@/@types/notes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from ".";

const URI = "api/notes";

// (POST) - create a new note - (CREATE)
export const noteCreation = async (
  payload: INoteModel,
): Promise<INoteResult> => {
  const res = await axiosInstance.put(URI, payload);
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
};

export const useNoteCreation = () => {
  return useMutation({
    mutationFn: (payload: INoteModel) => noteCreation(payload),
  });
};

// (POST) - get a note - (GET)
export const getNoteDetails = async (
  payload: IGetNoteDetailsRequest,
): Promise<INoteResult> => {
  const res = await axiosInstance.post(`${URI}/details`, payload);
  if (!res.data) {
    const txt = await res.statusText;
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  return res.data;
};

export const useNoteDetails = (payload: IGetNoteDetailsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTE, payload?.CodeId],
    queryFn: () => getNoteDetails(payload),
    enabled: !!payload?.CodeId,
  });
};
