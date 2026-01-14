import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { GlobalTreeStyles } from "@/styles/GlobalTreeStyledCss";
import { Tree, TreeProps } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { DirectoryTree } = Tree;

const ATree = ({ style, ...rest }: TreeProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <>
      <GlobalTreeStyles $theme={theme} />
      <DirectoryTree
        style={{
          background: "transparent",
          width: "100%",
          ...style,
        }}
        className={cn(font?.className)}
        {...rest}
      />
    </>
  );
};

export default ATree;
