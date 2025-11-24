"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { websiteFonts } from "@/fonts";
import { Input, InputProps } from "antd";
import styled from "styled-components";

const StyledAInput = styled(Input)<{ $theme: ThemeTypes }>`
  background: ${({ $theme }) => $theme.editorBackground} !important;
  color: ${({ $theme }) => $theme.outputColor} !important;
  border-color: ${({ $theme }) => $theme.border} !important;

  &::placeholder {
    color: ${({ $theme }) => $theme.outputColor}80 !important;
  }

  &:hover {
    border-color: ${({ $theme }) => $theme.activeColor} !important;
  }

  &.ant-input:focus,
  &.ant-input-focused {
    border-color: ${({ $theme }) => $theme.activeColor} !important;
    box-shadow: 0 0 0 2px ${({ $theme }) => $theme.activeColor}40 !important;
  }
`;

type BaseInputProps = InputProps & {
  theme: ThemeTypes;
  font: WebsiteFontsKey;
};

const BaseAInput = ({
  theme,
  font,
  style = {},
  className = "",
  ...props
}: BaseInputProps) => {
  return (
    <StyledAInput
      $theme={theme}
      style={{
        fontFamily: font.style.fontFamily,
        ...style,
      }}
      className={`${
        websiteFonts[font as WebsiteFontsKey]?.className
      } ${className}`}
      {...props}
    />
  );
};

export default BaseAInput;
