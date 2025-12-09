"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme, selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { ThemeTypes } from "@/@types/theme";
import { Button, ButtonProps } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { cn } from "@/lib/utils";

export type BtnType = "run" | "copy" | "sameBg" | "";

export interface BtnInterface {
  btntype?: BtnType;
}

export interface AButtonType extends ButtonProps, BtnInterface {}

const StyledAButton = styled(Button)<{
  $theme: ThemeTypes;
  $variant: BtnType;
  $type: string;
}>`
  font-weight: 500;

  ${({ $type, $theme }) =>
    $type === "primary" &&
    `
    background: ${$theme.activeColor} !important;
    border-color: ${$theme.activeColor} !important;
    color: white !important;
    backdrop-filter: blur(10px);

    &:hover {
      background: ${$theme.activeColor}80 !important;
      border-color: ${$theme.activeColor} !important;
      backdrop-filter: blur(10px);
    }
  `}

  ${({ $variant, $theme }) =>
    $variant === "copy" &&
    `
    background: ${$theme.border} !important;
    border-color: ${$theme.border} !important;
    color: white !important;

    &:hover {
      background: ${$theme.border15} !important;
      border-color: ${$theme.border20} !important;
    }
  `}

  ${({ $type, $theme }) =>
    $type === "default" &&
    `
    background: transparent;
    border-color: ${$theme.border};
    color: ${$theme.baseTextColor};

    &:hover {
      background: ${$theme.border20} !important;
      border-color: ${$theme.border20} !important;
      color: ${$theme.activeColor};
    }
  `}

  ${({ $type }) =>
    $type === "text" &&
    `
    background: transparent;
    border: none;

    &:hover {
      opacity: 0.8;
    }
  `}

  ${({ $variant, $theme }) =>
    $variant === "sameBg" &&
    `
    background: ${$theme.activeColor}60 !important;
    border-color: ${$theme.activeColor}90 !important;
    color: ${$theme.activeColor} !important;

    &:hover {
      background: ${$theme.activeColor}80 !important;
      border-color: ${$theme.activeColor} !important;
      color: ${$theme.activeColor} !important;
      filter: brightness(104%);
    }
  `}

  ${({ $variant }) =>
    $variant === "run" &&
    `
    background: #00a63e !important;
    border: none !important;
    color: white;

    &:hover {
      background: #00c14a !important;
      color: white !important;
      border: none !important;
    }
  `}
`;

export const AButton = ({
  children,
  btntype = "",
  type = "default",
  className,
  ...rest
}: AButtonType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const websiteFont = useSelector(selectWebsiteFont)
  const font = websiteFonts[websiteFont as WebsiteFontsKey]

  return (
    <StyledAButton
      $theme={theme}
      $variant={btntype}
      $type={type}
      type={type}
      {...rest}
      className={cn(font?.className, className, 'font-normal!')}
    >
      {children}
    </StyledAButton>
  );
};

