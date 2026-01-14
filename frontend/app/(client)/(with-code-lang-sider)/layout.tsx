"use client";
import AllEditorSider from "@/components/editor/all-editor-sider";
import { themeConfig } from "@/config/themeConfig";
import { EDITOR_HEIGHT } from "@/helper/_base.helper";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import React from "react";
import { useSelector } from "react-redux";

const CodeLangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      {/* <div className="h-8 flex items-center px-3">Coditor</div> */}
      <div
        className="flex w-full  "
        style={{
          height: EDITOR_HEIGHT,
          background: theme.background,
        }}
      >
        <AllEditorSider />
        {children}
      </div>
    </>
  );
};

export default CodeLangLayout;
