"use client";

import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { amarante, spaceGrotesk, websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import ReduxPersistProvider from "@/providers/reduxPersistProvider";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";

const NotFound = () => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const router = useRouter();
  return (
    <div className="w-full h-svh flex items-center justify-center flex-col overflow-hidden">
      <div className="flex items-center justify-center relative">
        <Image
          src="/404/man-working-on-laptop.png"
          width={600}
          height={600}
          alt="404"
          className="w-60 brightness-90"
        />

        <span
          className={cn(
            amarante.className,
            "flex items-center  justify-center w-[38rem] gap-x-0 ",
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] -z-10 "
          )}
        >
          {/* <p className=" ">4</p> */}
          <p className="text-[20rem] -translate-y-10 ">404</p>
          {/* <p className="text-[20rem] ">4</p> */}
        </span>
      </div>

      <p className={cn(spaceGrotesk.className, "text-xl mt-10 font-semibold")}>
        Page Not Found
      </p>
      <p
        className={cn(
          spaceGrotesk.className,
          "text-sm mb-4 opacity-70 text-center"
        )}
      >
        The page you’re looking for doesn’t exist or was moved.
      </p>

      <div className="flex items-center gap-x-4">
        {/* Back to previous page */}
        <button
          onClick={() => router.back()}
          className={cn(
            font?.className,
            "cursor-pointer mt-4 px-5 py-1.5 rounded-md hover:opacity-90 transition-all duration-200 ease-linear text-sm w-fit",
            "flex items-center justify-center gap-x-3"
          )}
          style={{
            backgroundColor: theme.border15,
          }}
        >
          <MdOutlineKeyboardBackspace size={20} />
          Back
        </button>

        {/* Go to home page */}
        <Link
          href="/"
          className={cn(
            font?.className,
            "cursor-pointer mt-4 px-5 py-1.5 rounded-md hover:opacity-90 transition-all duration-200 ease-linear text-sm",
            "flex items-center justify-center gap-x-3"
          )}
          style={{
            backgroundColor: theme.activeColor,
          }}
        >
          <FaHome className="-translate-y-px" />
          Go to Home
        </Link>
      </div>
    </div>
  );
};

// Introduced just to wrap inside redux - 'page' not mandatory in other cases.
const page = () => {
  return (
    <ReduxPersistProvider>
      <NotFound />
    </ReduxPersistProvider>
  );
};

export default page;
