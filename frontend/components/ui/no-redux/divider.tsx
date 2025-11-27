"use client";
import BaseCDivider from "../_Base/CDivider";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

interface CDividerType {
  style?: React.CSSProperties;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const NRCDivider = ({
  style,
  direction = "vertical",
  className = "",
}: CDividerType) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <BaseCDivider
      style={style}
      className={className}
      direction={direction}
      theme={theme}
    />
  );
};

export default NRCDivider;
