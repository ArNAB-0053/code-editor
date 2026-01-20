"use client";

import { MenuBar } from "./menu-bar";
import type { Editor } from '@tiptap/react'
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";

const NotesHeader = ({
  editor,
  setOpen,
}: {
  editor: Editor;
  setOpen: SetterFunctionTypesBool;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="flex w-full shadow-sm rounded-none relative backdrop-blur-3xl! "
      style={{
        backgroundColor: theme.border5,
      }}
    >
      <MenuBar editor={editor} />

      <div className="flex items-center justify-end gap-x-3 absolute top-0 right-0 ">
        {/* <FileLangLayoutButtons /> */}
        {/* <FullscreenButton /> */}

        <button className={cn("opacity-90 cursor-pointer hover:bg-red-600 h-12 w-12 flex items-center justify-center", transitionString)} onClick={() => setOpen(false)}>
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default NotesHeader;
