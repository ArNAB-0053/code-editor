"use client";
import AllEditorSider from "@/components/editor/all-editor-sider";
import React from "react";

const CodeLangLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-full w-full">
      <AllEditorSider />
      {children}
    </div>
  );
};

export default CodeLangLayout;
