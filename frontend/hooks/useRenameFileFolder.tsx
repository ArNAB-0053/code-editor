import { IFileRenameRequest } from "@/@types/files";
import { messagesConfig } from "@/config/messages.config";
import { setCreatedFileNameRedux } from "@/redux/slices/createdFilesEditorSlice";
import { useRenameFile } from "@/services/files";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useRename = () => {
  const { mutate: renameFile } = useRenameFile();
  const dispatch = useDispatch();

  const rename = async (payload: IFileRenameRequest) => {
    renameFile(payload, {
      onSuccess: () => {
        dispatch(setCreatedFileNameRedux(payload.FileName));
        toast.success(messagesConfig.RENAME);
      },
      onError: () => toast.error(messagesConfig.SOMETHING_WENT_WRONG)
    });
  };

  return { rename };
};
