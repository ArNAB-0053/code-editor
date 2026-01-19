"use client";

import { MenuBar } from "./menu-bar";
import { FullscreenButton } from "../file_lang/fullscreen-btn";
import FileLangLayoutButtons from "../file_lang/layout-buttons";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { SetterFunctionTypesBool } from "@/@types/_base";

const NotesHeader = ({
  editor,
  setOpen,
}: {
  editor: any;
  setOpen: SetterFunctionTypesBool;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="flex h-10 w-full shadow-sm rounded-none  "
      style={{
        backgroundColor: theme.border5,
      }}
    >
      <MenuBar editor={editor} />

      <div className="flex items-center justify-end gap-x-3 h-full">
        {/* <FileLangLayoutButtons />
        <FullscreenButton /> */}

        <button className="opacity-90 cursor-pointer bg-red-600 h-full px-3" onClick={() => setOpen(false)}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default NotesHeader;
