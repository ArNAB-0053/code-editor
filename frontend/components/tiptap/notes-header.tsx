"use client";

import { MenuBar } from "./menu-bar";
import type { Editor } from "@tiptap/react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";

const NotesHeader = ({
  editor,
  width,
}: {
  editor: Editor;
  width?: number;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="flex w-full shadow-sm rounded-none! relative backdrop-blur-3xl! "
      style={{
        backgroundColor: theme.border5,
        zIndex: 99999,
      }}
    >
      <MenuBar editor={editor} width={width} />
    </div>
  );
};

export default NotesHeader;
