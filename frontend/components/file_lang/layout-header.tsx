"use client";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { X } from "lucide-react";
import FileLangLayoutButtons from "./layout-buttons";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FullscreenButton } from "./fullscreen-btn";
import PublishDropdown from "../dropdown/publish-dropdown";
import NavigationDropdown from "../dropdown/navigation-dropdown";

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
      <div className="pl-3 flex items-center gap-x-9">
        <span>Logo</span>

        <NavigationDropdown/>
      </div>

      <div className="flex items-center justify-end gap-x-6 h-full">
        <PublishDropdown />

        <div className="w-0.5 h-6 " style={{ backgroundColor: theme.border }} />

        <div className="flex items-center justify-end gap-x-3 h-full">
          <FileLangLayoutButtons />
          <FullscreenButton />

          <button className="opacity-90 cursor-pointer bg-red-600 h-full px-3">
            <X size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default FileLanglayoutHeader;
