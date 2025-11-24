"use client";
import { themeConfig } from "@/config/themeConfig";
export interface CDividerType {
  style?: any;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const CDivider = ({
  style,
  direction = "vertical",
  className = "",
}: CDividerType) => {
  const theme = themeConfig();
  if (direction === "horizontal") {
    return (
      <div
        className={`w-px mx-3 ${className}`}
        style={{
          background: theme.border10,
          height: "100%",
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        background: theme.border10,
        width: "100%",
        ...style,
      }}
      className={`h-px my-3 place-self-center ${className}`}
    />
  );
};

export default CDivider;
