"use client";
import Sider from "@/components/file/sider";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

const FileFolderLayout = ({ children }: { children: ReactNode }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="flex items-start gap-x-4 lg:gap-x-6 xl:gap-x-8"
      style={{
        height: "calc(100svh - 120px)",
      }}
    >
      <Sider />
      <div
        className="flex-1 h-full overflow-x-hidden overflow-y-auto custom-scrollbar px-4 py-5 lg:px-5 rounded-xl "
        style={{
          background: theme.border5,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FileFolderLayout;
