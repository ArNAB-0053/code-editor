import { INoteModel, IRenameNoteRequest } from "@/@types/notes";
import { messagesConfig } from "@/config/messages.config";
import { selectedfileId } from "@/redux/slices/createdFilesEditorSlice";
import { setNotesTitle } from "@/redux/slices/notesSlice";
import { useNoteCreation, useRenameNote } from "@/services/notes";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useNote = () => {
  const { mutate: createNote } = useNoteCreation();
  const { mutate: renameNoteMutate } = useRenameNote();

  const fileId = useSelector(selectedfileId);

  const dispatch = useDispatch();

  const addNote = async (payload: INoteModel) => {
    const toastId = toast.loading(messagesConfig.AUTOSAVE.LOADING)
    createNote(payload, {
      onSuccess: () => toast.success(messagesConfig.AUTOSAVE.SUCCESS, {id: toastId}),
      onError: () => toast.error(messagesConfig.AUTOSAVE.FAILED, {id: toastId}),
    });
  };

  const renameNote = async (payload: IRenameNoteRequest) => {
    renameNoteMutate(payload, {
      onSuccess: () => {
        dispatch(
          setNotesTitle({
            fileId: fileId,
            title: payload?.Title,
          }),
        );
        toast.success(messagesConfig.RENAME)
      },
      onError: () => toast.error(messagesConfig.SOMETHING_WENT_WRONG)
    });
  };

  return { addNote, renameNote };
};
