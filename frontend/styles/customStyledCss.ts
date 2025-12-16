import { ThemeTypes } from "@/@types/theme";
import { createGlobalStyle } from "styled-components";

export const GlobalShareStyles = createGlobalStyle<{
  $theme: ThemeTypes;
  $isChecked: boolean;
}>`
  .ant-switch {
    background: ${({ $theme }) => $theme?.border20} !important;
  }
  .ant-switch-checked {
    background: ${({ $theme }) => $theme?.activeColor}90 !important;
  }
  .ant-switch-handle::before {
    background: ${
      ({ $theme, $isChecked }) =>
        $isChecked
          ? `${$theme.activeColor}` // when checked
          : `rgba(255, 255, 255, 0.5)` // when not checked
    } !important;
  }
`;

export const GlobalStyles = createGlobalStyle<{
  $theme: ThemeTypes;
}>`
  .ant-card {
    background: ${({ $theme }) => $theme?.border10} !important;
    color: ${({ $theme }) => $theme?.textColor} !important;
  }

  .ant-card-bordered {
    border-color: ${({ $theme }) => $theme?.border} !important;
  }
  .ant-card-body {
    padding: 10px !important;
  }
`;

export const GlobalEditorStyles = createGlobalStyle`
  .margin-view-overlays {
    display: none !important;
  }
    
  .monaco-scrollable-element, .editor-scrollable, .vs-dark {
    left: 0px !important;
    width: 100% !important;
  }
`;

