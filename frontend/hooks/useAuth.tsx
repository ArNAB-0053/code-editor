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

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {mutateAsync: loginMutate} = useLogin();
  const {mutateAsync: registerMutate} = useRegister();

  const loginUser = async ({
    values,
    showToast = true,
  }: {
    values: {
      identifier: string;
      password: string;
    };
    showToast?: boolean;
  }) => {
    const toastId = showToast
      ? toast.loading(messagesConfig.LOGIN.LOADING)
      : null;

    try {
      const data = await loginMutate(values);

      if (data.status === "success") {
        dispatch(setUserId(data.user?.id));
        dispatch(setUserName(data.user?.name));
        dispatch(setUserEmail(data.user?.email));
        dispatch(setUserUsername(data.user?.username));

        if (showToast)
          toast.success(messagesConfig.LOGIN.SUCCESS, { id: toastId ?? "" });

        router.push(appUrls.LANG);
      } else {
        if (showToast)
          toast.error(messagesConfig.LOGIN.ERROR, { id: toastId ?? "" });
      }
    } catch (err) {
      if (showToast)
        toast.error(messagesConfig.LOGIN.ERROR, { id: toastId ?? "" });
    }
  };

  const registerUser = async (values: {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    const toastId = toast.loading(messagesConfig.SIGN_UP.LOADING);
    try {
      const data = await registerMutate(values);
      if (data.status === "success") {
        toast.success(messagesConfig.SIGN_UP.SUCCESS, { id: toastId });

        const loginValues = {
          identifier: values?.username , // NO NEED OF 'EMAIL' - As to CREATE ACCOUNT user need USERNAME
          password: values?.password,
        };

        await loginUser({
          values: loginValues,
          showToast: false,
        });
      } else {
        toast.error(messagesConfig.SIGN_UP.ERROR, { id: toastId });
      }
    } catch (e: unknown) {
      toast.error(messagesConfig.SIGN_UP.ERROR, { id: toastId });
    }
  };

  return { loginUser, registerUser };
};
