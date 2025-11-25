"use client";
import React from "react";
import BaseCButton from "../_Base/CButton";

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
  return (
    <BaseCButton
      useDiv={useDiv}
      style={style}
      className={` transition-all duration-150 ease-linear ${className}`}
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
