"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/ChevronIcons";
import { StyledSplitter } from "@/components/editor/editors-component";
import FileCodeSider from "@/components/file/code/file-code-sider";
import { themeConfig } from "@/config/themeConfig";
import { EDITOR_HEIGHT } from "@/helper/_base.helper";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import React from "react";
import { useSelector } from "react-redux";

const CodeLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const screenWidth = useScreenWidth();

  return (
    <div className="flex h-full w-full">
      <StyledSplitter
        $theme={theme}
        style={{
          height: "100%",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
        collapsibleIcon={{
          start: <ChevronLeftIcon />,
          end: <ChevronRightIcon />,
        }}
      >
        <StyledSplitter.Panel
          defaultSize={screenWidth >= 900 ? 250 : 180}
          min={screenWidth >= 900 ? 200 : 180}
          collapsible={{
            start: true,
            end: true,
            showCollapsibleIcon: true,
          }}
          max="40%"
          style={{
            height: EDITOR_HEIGHT,
            // paddingBottom: "10px",
          }}
          className="relative!"
        >
          <FileCodeSider />
        </StyledSplitter.Panel>

        <StyledSplitter.Panel
          className="relative! overflow-hidden!"
        >
          {children}
        </StyledSplitter.Panel>
      </StyledSplitter>
    </div>
  );
};

export default CodeLayout;
