"use client";
import React from "react";
import BaseCButton from "../_Base/CButton";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

type CButtonProps = {
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

const NRCButton = ({
  children,
  onClick,
  useDiv = false,
  style = {},
  className = "",
  type = "primary",
  hoverColor = null,
  hoverBgColor = null,
  variant = "default",
}: CButtonProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName)

  const {font} = useFont()

  console.log("Theme from btn => ", theme);
  return (
    <BaseCButton
      theme={theme}
      useDiv={useDiv}
      style={style}
      className={` transition-all duration-150 ease-linear ${font?.className} ${className}`}
      hoverColor={hoverColor}
      hoverBgColor={hoverBgColor}
      type={type}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </BaseCButton>
  );
};

export default NRCButton;
