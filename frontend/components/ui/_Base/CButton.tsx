"use client";
import React, { useState } from "react";
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
  disabled: boolean;
};

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
  disabled = false,
}: BaseCButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const userBg = style.backgroundColor ?? null;
  const finalBaseBg = userBg ?? backgroundColor;

  const buttonStyles: React.CSSProperties = {
    ...style,
    backgroundColor: isHovered && hoverBgColor ? hoverBgColor : finalBaseBg,
    color: isHovered && hoverColor ? hoverColor : color,
    border: `1px solid ${borderColor}`,
    padding: "6px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.15s ease-linear",
  };

  const Component = useDiv ? "div" : "button";

  return (
    <Component
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyles}
      className={type === "link" ? "underline " + className : className}
      disabled={disabled}
    >
      {children}
    </Component>
  );
};

export default BaseCButton;
