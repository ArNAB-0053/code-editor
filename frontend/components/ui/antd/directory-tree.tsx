"use client";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { WebsiteFontsKey } from "@/@types/font";
import { MODAL_HEIGHT } from "..";

const { DirectoryTree } = Tree;

const StyledWrapper = styled.div<{ $theme: ThemeTypes }>`
  .ant-tree:hover,
  .ant-tree-title:hover {
    color: ${({ $theme }) => $theme.hoverTextColor} !important;
    transition-property: all;
    transition-duration: 150ms;
    transition-timing-function: linear;
  }
  
  .ant-tree-indent {
    width: 0px !important;
  }

  .ant-tree-treenode {
    margin-bottom: 0px !important;
    line-height: 12px !important;
  }

  .ant-tree-switcher {
    display: none !important;
  }

  .ant-tree-treenode-selected {
    background-color: transparent !important;
  }

  .ant-tree-iconEle {
    display: none !important;
  }

  .ant-tree-node-content-wrapper {
    min-height: 0px !important;
  }
  
  .ant-tree-node-content-wrapper:hover {
    min-height: 0px !important;
    color: ${({ $theme }) => $theme.hoverTextColor} !important;
  }

  .ant-tree-treenode-selected .ant-tree-node-content-wrapper:before {
    background-color: transparent !important;
  }
`;

const ADirectoryTree = <T extends DataNode = DataNode>({
  style,
  className,
  ...rest
}: DirectoryTreeProps<T>) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  
  return (
    <StyledWrapper $theme={theme}>
      <DirectoryTree<T>
        className={`${websiteFonts[websiteFont as WebsiteFontsKey]?.className} bg-transparent! transition-all duration-150 ease-linear overflow-x-hidden overflow-y-auto ${className}`}
        style={{
          height: MODAL_HEIGHT,
          color: `${theme.textColor}80`,
          fontWeight: 400,
          fontSize: "14px",
          ...style,
        }}
        {...rest}
      />
    </StyledWrapper>
  );
};

export default ADirectoryTree;