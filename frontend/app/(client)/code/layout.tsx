"use client";
import { StyledSplitter } from "@/components/editor/editors-component/createdFileEditor";
import FileCodeSider from "@/components/file/code/file-code-sider";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Splitter } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const CodeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className="flex ">
      <StyledSplitter
        $theme={theme}
        style={{
          height: "100%",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Splitter.Panel
          defaultSize={300}
          min={250}
          max="50%"
          style={{
            height: "calc(100svh - 68px)",
            paddingBottom: "10px",
          }}
          className="relative!"
        >
          <FileCodeSider />          
        </Splitter.Panel>
        <Splitter.Panel>{children}</Splitter.Panel>
      </StyledSplitter>
    </div>
  );
};

export default CodeLayout;
