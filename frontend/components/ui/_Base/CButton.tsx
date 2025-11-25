"use client";
import React from "react";
import styled from "styled-components";

export type BaseCButtonProps = {
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
    background: ${({ $hoverBgColor, $bg }) =>
      $hoverBgColor ?? $bg} !important;

    color: ${({ $hoverColor, $color }) =>
      $hoverColor ?? $color} !important;
  }
`;

const StyledBaseCDiv = styled.div<{
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
      : 'var(--activeColor)';

  // Type-based text / border color
  let color = "#fff";
  let borderColor = "transparent";

  switch (type) {
    case "primary":
      color = "#fff";
      borderColor = 'var(--activeColor)';
      break;

    case "secondary":
      color = 'var(--activeColorHover)';
      borderColor = 'var(--activeColorHover)';
      break;

    case "danger":
      color = "#ff4d4f";
      borderColor = "#ff4d4f";
      break;

    case "text":
      color = 'var(--activeColor)';
      borderColor = "transparent";
      break;

    case "link":
      color = 'var(--activeColor)';
      borderColor = "transparent";
      break;

    case "none":
      color = 'var(--textColor)';
      borderColor = "transparent";
      backgroundColor = "transparent";
      break;
  }

  if (variant === "bordered") {
    backgroundColor = "transparent";
    borderColor = 'var(--activeColor)';
    color = 'var(--activeColor)';
  }

  return useDiv ? (
    <StyledBaseCDiv
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