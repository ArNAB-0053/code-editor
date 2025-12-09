import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useLogin, useRegister } from "@/services/auth";
import {
  setUserId,
  setUserName,
  setUserEmail,
  setUserUsername,
} from "@/redux/slices/userSlice";
import { messagesConfig } from "@/config/messages.config";
import { appUrls } from "@/config/navigation.config";
import { IAuthReturn, IUserDetails } from "@/@types/auth";
import { LoginFormType, RegisterFormType } from "@/zod/auth.z";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { mutateAsync: loginMutate } = useLogin();
  const { mutateAsync: registerMutate } = useRegister();

  const loginUser = async ({
    values,
    showToast = true,
  }: {
    values: LoginFormType;
    showToast?: boolean;
  }) => {
    const toastId = showToast
      ? toast.loading(messagesConfig.LOGIN.LOADING)
      : null;

    try {
      const res: IAuthReturn = await loginMutate(values);
      const data: IUserDetails = res?.user;

      console.log("__AUTH__ Login: ",data)

      if (res.status === "success") {
        dispatch(setUserId(data?.id));
        dispatch(setUserName(data?.name));
        dispatch(setUserEmail(data?.email));
        dispatch(setUserUsername(data?.username));

        if (showToast)
          toast.success(messagesConfig.LOGIN.SUCCESS, { id: toastId ?? "" });

        router.push(appUrls.LANG);
      } else {
        if (showToast)
          toast.error(messagesConfig.LOGIN.ERROR, { id: toastId ?? "" });
      }
    } catch {
      if (showToast)
        toast.error(messagesConfig.LOGIN.ERROR, { id: toastId ?? "" });
    }
  };

  const registerUser = async (values: RegisterFormType) => {
    const toastId = toast.loading(messagesConfig.SIGN_UP.LOADING);
    try {
      const res: IAuthReturn = await registerMutate(values);

      console.log("__AUTH__ Register: ",res.user)

      if (res?.status === "success") {
        toast.success(messagesConfig.SIGN_UP.SUCCESS, { id: toastId });

        const loginValues = {
          identifier: values?.username, // NO NEED OF 'EMAIL' - As to CREATE ACCOUNT user need USERNAME
          password: values?.password,
        };

        await loginUser({
          values: loginValues,
          showToast: false,
        });
      } else {
        toast.error(messagesConfig.SIGN_UP.ERROR, { id: toastId });
      }
    } catch {
      toast.error(messagesConfig.SIGN_UP.ERROR, { id: toastId });
    }
  };

  return { loginUser, registerUser };
};
