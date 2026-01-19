import { ThemeTypes } from "@/@types/theme";
import { Splitter } from "antd";
import styled from "styled-components";

export const StyledSplitter = styled(Splitter)<{ $theme: ThemeTypes }>`
  .ant-splitter-bar {
    background: ${({ $theme }) => $theme.splitterColor} !important;
  }

  &[data-layout="vertical"] .ant-splitter-bar {
    height: 4px !important;
    cursor: row-resize;
  }

  &[data-layout="horizontal"] .ant-splitter-bar {
    width: 4px !important;
    cursor: col-resize;
  }

  .ant-splitter-bar-dragger::before {
    background: ${({ $theme }) => $theme.splitterColor} !important;
  }

  .ant-splitter-horizontal > .ant-splitter-bar,
  .ant-splitter-bar-collapse-bar-start,
  .ant-splitter-bar-collapse-bar-end {
    &:hover {
      background-color: ${({ $theme }) => $theme.border10}20 !important;
      opacity: 0.6 !important;
    }
    background-color: ${({ $theme }) => $theme.border15} !important;
    color: ${({ $theme }) => $theme.textColor} !important;
    opacity: 1 !important;
    transition: all 0.2s ease-in-out;
  }
`;