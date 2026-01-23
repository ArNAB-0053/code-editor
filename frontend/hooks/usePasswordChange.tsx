import { toast } from "sonner";
import {
  useChangePassword,
} from "@/services/auth";
import { messagesConfig } from "@/config/messages.config";
import { ChangePasswordType } from "@/zod/auth.z";
import { IBaseReturn } from "@/@types/_base";

export const usePasswordChange = () => {
  const { mutateAsync: changePasswordMutate } = useChangePassword();

  const changePassword = async (valus: ChangePasswordType) => {
    const toastId = messagesConfig.CHANGE_PASSWORD.LOADING;
    try {
      const res: IBaseReturn = await changePasswordMutate(valus);
      if (res.status == "success")
        toast.success(messagesConfig.CHANGE_PASSWORD.SUCCESS, { id: toastId });
      else toast.error(messagesConfig.CHANGE_PASSWORD.ERROR, { id: toastId });
    } catch {
      toast.error(messagesConfig.CHANGE_PASSWORD.ERROR, { id: toastId });
    }
  };

  return { changePassword };
};
