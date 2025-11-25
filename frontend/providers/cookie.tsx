"use client";
import { ReactNode, useEffect, useLayoutEffect } from "react";
import { getCookies, setCookies } from "@/helper/cookies";
import {
  selectEditorTheme,
  selectWebsiteFont,
  setEditorTheme,
  setWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useDispatch } from "react-redux";
import { WebsiteFontsKey } from "@/@types/font";
import { useTheme } from "@/context/ThemeContext";
import { useFont } from "@/context/FontProvider";
import { useSelector } from "react-redux";

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const cookieTheme = getCookies("theme");
  const cookieFont = getCookies("font");

  useLayoutEffect(() => {
    console.log("cookieTheme", cookieTheme);
    const setCookieTheme = () => {
      if (!cookieTheme) {
        setCookies("theme", 365, "lax", "app-dark");
      }
    };

    const setCookieFont = () => {
      if (!cookieFont) {
        setCookies("font", 365, "lax", "prompt");
      }
    };

    setCookieTheme();
    setCookieFont();
  }, [cookieTheme, cookieFont]);
  return <>{children}</>;
};

export const CookieProviderForLocalStorage = ({
  children,
}: {
  children: ReactNode;
}) => {
  const dispatch = useDispatch();

  const { themeName } = useTheme();
  const { fontName } = useFont();
  // console.log("themeName -> ", themeName);

  useLayoutEffect(() => {
    // console.log("themeName === > ", themeName, fontName);
    dispatch(setEditorTheme(themeName));
    dispatch(setWebsiteFont(fontName as WebsiteFontsKey));
  }, [themeName, fontName, dispatch]);
  return <>{children}</>;
};

export const CookieProviderToSetPreferrenceToCookie = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  const { themeName, updateTheme } = useTheme();
  const { fontName, updateFont } = useFont();

  useEffect(() => {
    if (editorTheme !== themeName) {
      updateTheme(editorTheme);
    }
    if (websiteFont !== fontName) {
      updateFont(websiteFont);
    }
  }, [editorTheme, themeName, websiteFont, fontName, updateFont, updateTheme]);

  return true;
};
