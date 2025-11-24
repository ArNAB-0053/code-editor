"use client";
import React from "react";
import { themeConfig } from "@/config/themeConfig";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { BaseCButton } from "../_Base";

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

const CButton = ({
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
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <BaseCButton
      theme={theme}
      useDiv={useDiv}
      style={style}
      className={className}
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

export default CButton;
