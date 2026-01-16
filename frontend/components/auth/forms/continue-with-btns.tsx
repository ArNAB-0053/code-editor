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

export const ContinueWithGoogle = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleClick = () => {
    signIn("github");
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setOpen(true);
    }
  }, [status, session]);

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

      <CompleteSignupModal open={open} setOpen={setOpen} />
    </>
  );
};
