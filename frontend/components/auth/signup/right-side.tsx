import Logo from "@/components/Logo";
import { SignUpForm } from "../forms";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { appUrls } from "@/config/navigation.config";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";

const RightSide = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <div className="flex flex-col h-svh items-center justify-center gap-y-5 px-6 max-[460px]:w-full w-[26rem] md:w-full lg:w-[26rem] place-self-center relative overflow-hidden! ">
      <div className="mb-5 w-full flex items-center justify-between">
        <Logo />
        <span
          className={cn(
            "w-[40%] text-end text-sm leading-4",
            spaceGrotesk.className
          )}
        >
          Already have account?
          <Link
            href={appUrls.LOGIN}
            className={cn(
              "underline ml-1 font-medium text-sm hover:opacity-80 transition-all duration-100 ease-linear",
              jetBrainsMono.className
            )}
            style={{ color: theme.activeColor }}
          >
            Login
          </Link>
        </span>
      </div>
      {/* <div className="flex flex-col items-start mb-2 w-full">
          <h1
            className={cn(
              "text-3xl text-start font-black tracking-tighter opacity-80",
              jetBrainsMono.className
            )}
          >
            Create Your Account
          </h1>
          <p className={cn("text-sm opacity-70", prompt.className)}>
            start for free
          </p>
        </div> */}
      <ReduxPersistProvider>
        <SignUpForm />
      </ReduxPersistProvider>

      
    </div>
  );
};

export default RightSide;
