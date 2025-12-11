import { ThemeTypes } from "@/@types/theme";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<{
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