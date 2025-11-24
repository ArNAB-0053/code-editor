"use client";
import { useState } from "react";
import { getCookies, setCookies } from "@/helper/cookies";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";

export const useCookieTheme = () => {
  const [cookieTheme, setCookieTheme] = useState(getCookies("theme") || "app-dark");
  const theme = themeConfig(cookieTheme);

  const updateTheme = (value: string) => {
    setCookies("theme", 365, "lax", value);
    setCookieTheme(value); 
  };

  return { theme, cookieTheme, updateTheme };
};

export const useCookieFont = () => {
  const [cookieFont, setCookieFont] = useState(getCookies("font") || "prompt" as WebsiteFontsKey);
  const font = websiteFonts[cookieFont as WebsiteFontsKey];

  const updateFont = (value: string) => {
    setCookies("font", 365, "lax", value);
    setCookieFont(value); 
  };

  return { font, cookieFont, updateFont };
};

