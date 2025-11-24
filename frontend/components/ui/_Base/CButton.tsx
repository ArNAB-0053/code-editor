"use client";
import React from "react";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";

export type BaseCButtonProps = {
  theme: ThemeTypes;
  children: React.ReactNode;
  useDiv?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
  type?: "primary" | "secondary" | "danger" | "text" | "link" | "none";
  variant?: "transparent" | "sameBg" | "bordered" | "default";
  hoverColor?: string | null;
  hoverBgColor?: string | null;
};

const StyledBaseCButton = styled.button<{
  $theme: ThemeTypes;
  $hoverColor: string | null;
  $hoverBgColor: string | null;
  $bg: string;
  $color: string;
  $borderColor: string;
}>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ $hoverBgColor, $bg }) =>
      $hoverBgColor ?? $bg} !important;

    color: ${({ $hoverColor, $color }) =>
      $hoverColor ?? $color} !important;
  }
`;

const StyledBaseCDiv = styled.div<{
  $theme: ThemeTypes;
  $hoverColor: string | null;
  $hoverBgColor: string | null;
  $bg: string;
  $color: string;
  $borderColor: string;
}>`
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $borderColor }) => $borderColor};
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: ${({ $hoverBgColor, $bg }) =>
      $hoverBgColor ?? $bg} !important;

    color: ${({ $hoverColor, $color }) =>
      $hoverColor ?? $color} !important;
  }
`;

const BaseCButton = ({
  theme,
  children,
  onClick,
  useDiv = false,
  style = {},
  className = "",
  type = "primary",
  hoverColor = null,
  hoverBgColor = null,
  variant = "default",
}: BaseCButtonProps) => {
  // Variant-based background
  let backgroundColor =
    variant === "transparent"
      ? "transparent"
      : variant === "sameBg"
      ? "inherit"
      : theme.activeColor;

  // Type-based text / border color
  let color = "#fff";
  let borderColor = "transparent";

  switch (type) {
    case "primary":
      color = "#fff";
      borderColor = theme.activeColor;
      break;

    case "secondary":
      color = `${theme.activeColor}80`;
      borderColor = `${theme.activeColor}50`;
      break;

    case "danger":
      color = "#ff4d4f";
      borderColor = "#ff4d4f";
      break;

    case "text":
      color = theme.activeColor;
      borderColor = "transparent";
      break;

    case "link":
      color = theme.activeColor;
      borderColor = "transparent";
      break;

    case "none":
      color = theme.textColor;
      borderColor = "transparent";
      backgroundColor = "transparent";
      break;
  }

  if (variant === "bordered") {
    backgroundColor = "transparent";
    borderColor = theme.activeColor;
    color = theme.activeColor;
  }

  return useDiv ? (
    <StyledBaseCDiv
      $theme={theme}
      onClick={onClick}
      $hoverColor={hoverColor}
      $hoverBgColor={hoverBgColor}
      $bg={backgroundColor}
      $color={color}
      $borderColor={borderColor}
      style={style}
      className={type === "link" ? "underline " + className : className}
    >
      {children}
    </StyledBaseCDiv>
  ) : (
    <StyledBaseCButton
      $theme={theme}
      onClick={onClick}
      $hoverColor={hoverColor}
      $hoverBgColor={hoverBgColor}
      $bg={backgroundColor}
      $color={color}
      $borderColor={borderColor}
      style={style}
      className={type === "link" ? "underline " + className : className}
    >
      {children}
    </StyledBaseCButton>
  );
};

export default BaseCButton;