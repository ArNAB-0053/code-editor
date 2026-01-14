"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { GlobalStyles } from "@/styles/GlobalStyledCss";
import React from "react";
import { useSelector } from "react-redux";

export const WrapperRedux = ({ children }: { children: React.ReactNode }) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className={font?.className}>
      <GlobalStyles $theme={theme} $font={font} />
      {children}
    </div>
  );
};
