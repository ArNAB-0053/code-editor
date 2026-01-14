"use client";
import { ThemeTypes } from "@/@types/theme";
import React from "react";

export interface CDividerType {
  style?: React.CSSProperties;
  className?: string;
  direction?: "horizontal" | "vertical";
  theme: ThemeTypes;
}

const BaseCDivider = ({
  style,
  direction = "vertical",
  className = "",
  theme
}: CDividerType) => {
  if (direction === "horizontal") {
    return (
      <div
        className={`w-px mx-3 ${className}`}
        style={{
          backgroundColor: theme.border10,
          height: "100%",
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        backgroundColor: theme.border10,
        width: "100%",
        ...style,
      }}
      className={`h-px my-3 place-self-center ${className}`}
    />
  );
};

export default BaseCDivider;
