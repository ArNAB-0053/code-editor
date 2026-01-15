// import GoogleLogo from "@/assets/GoogleLogo";
import { NRCButton } from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { appUrls } from "@/config/navigation.config";

export const ContinueWithGoogle = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const { data: session } = useSession();

  return (
    <>
      <NRCButton
        type="none"
        variant="transparent"
        className="w-full! flex items-center justify-center gap-x-3 opacity-80 hover:opacity-100"
        hoverBgColor={`${theme.activeColor}40`}
        style={{
          backgroundColor: `${theme.activeColor}30`,
        }}
        onClick={() => signIn("github", { callbackUrl: appUrls.COMPLETE_SIGNUP })}
      >
        {/* <GoogleLogo style={{ width: "18px" }} /> */}
        <FaGithub />
        <span className={cn("font-medium", spaceGrotesk.className)}>
          Continue With GIthub
        </span>
      </NRCButton>

      <p className="text-white">{session && JSON.stringify(session)}</p>
    </>
  );
};
