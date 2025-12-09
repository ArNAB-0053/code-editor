"use client";
import { useTheme } from "@/context/ThemeContext";
import React from "react";

const BackgroundProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.background,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundProvider;
