// import GoogleLogo from "@/assets/GoogleLogo";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { appUrls } from "@/config/navigation.config";
import { transitionString } from "@/styles";
import CompleteSignupModal from "@/components/modals/auth/sign-up/complete-signup";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { RegisterProType } from "@/zod/auth.z";
import { ProviderTypeEnumString } from "@/@types/_enums";
import { IRegisterUsingProviderRequest } from "@/@types/auth";
import { NameObjType } from "@/@types/_base";
import { parseFullName } from "@/helper/_base.helper";
import EditorLoader from "@/components/Loaders/editor";

export const ContinueWithGoogle = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const { registerUserUsingProvider: registerUser } = useAuth();

  console.log(session?.user);
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setOpen(true);
    }
  }, [status, session]);

  const handleClick = async () => {
    await signIn("github");
  };

  /* 
    Note: if need to be optimised (I Guess)
    - write now it first login from github the using that data storing those into DB.
    - concern is if suppose from github login is successful but db for some reason failed to store the data
    - in that case if db fails then that user details need to deleted from cookies 
  */

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const name = parseFullName(session.user.name ?? "");

      const payload: IRegisterUsingProviderRequest = {
        username: session?.user?.username as string,
        email: session?.user?.email as string,
        provider: session?.user?.provider ?? ProviderTypeEnumString.GITHUB,
        name,
        providerId: session?.user?.providerId,
      };

      console.log(payload);
      registerUser(payload);
    }
  }, [status, session]);

  if (status === "loading")
    return (
      <div className="fixed w-screen h-screen flex items-center justify-center left-0 top-0 backdrop-blur-sm">
        <EditorLoader />
      </div>
    );

  return (
    <>
      <button
        className={cn(
          "w-full! flex items-center justify-center gap-x-3 border-2 py-1.5 cursor-pointer opacity-80 hover:opacity-100 rounded-md",
          transitionString
        )}
        style={{
          backgroundColor: `${theme.activeColor}30`,
          color: theme.textColor,
          borderColor: theme.activeColor,
        }}
        onClick={handleClick}
      >
        <FaGithub size={20} />
        <span className={cn("font-medium", spaceGrotesk.className)}>
          Continue With Github
        </span>
      </button>

      {/* <CompleteSignupModal open={open} setOpen={setOpen} /> */}
    </>
  );
};
