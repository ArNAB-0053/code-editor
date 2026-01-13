"use client";
import AllEditorSider from "@/components/editor/all-editor-sider";
import Logo from "@/components/Logo";
import { EDITOR_HEIGHT } from "@/helper/_base.helper";
import React from "react";

const CodeLangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      {/* <div className="h-8 flex items-center px-3">Coditor</div> */}
      <div
        className="flex w-full "
        style={{
          height: EDITOR_HEIGHT,
        }}
      >
        <AllEditorSider />
        {children}
      </div>
    </>
  );
};

export default CodeLangLayout;
