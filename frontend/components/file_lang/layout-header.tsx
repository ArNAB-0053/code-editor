"use client";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { X } from "lucide-react";
import FileLangLayoutButtons from "./layout-buttons";
import { spaceGrotesk, websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FullscreenButton } from "./fullscreen-btn";
import PublishDropdown from "../dropdown/publish-dropdown";
import NavigationDropdown from "../dropdown/navigation-dropdown";
import { FullLogo, HalfLogo } from "@/assets/Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FileLanglayoutHeader = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <header
      className="h-10 w-full flex items-center justify-between border-b "
      style={{
        backgroundColor: theme.border5,
        borderBottom: theme.border,
      }}
    >
      <div className=" flex items-center gap-x-4">
        <Link href="/" className="flex items-center opacity-60">
          <HalfLogo size={30}/>
        </Link>

        <NavigationDropdown/>
      </div>

      <div className="flex items-center justify-end gap-x-6 h-full">
        <PublishDropdown />

        <div className="w-0.5 h-6 " style={{ backgroundColor: theme.border }} />

        <div className="flex items-center justify-end gap-x-3 mr-3 h-full">
          <FileLangLayoutButtons />
          <FullscreenButton />

          {/* <button className="opacity-90 cursor-pointer bg-red-600 h-full px-3">
            <X size={20} />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default FileLanglayoutHeader;
