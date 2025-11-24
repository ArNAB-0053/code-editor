"use client";
import { ReactNode, useLayoutEffect } from "react";
import { getCookies, setCookies } from "@/helper/cookies";
import {
  selectEditorTheme,
  selectWebsiteFont,
  setEditorTheme,
  setWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { WebsiteFontsKey } from "@/@types/font";

export const CookieProvider = ({ children }: { children: ReactNode }) => {
  const cookieTheme = getCookies("theme");
  const cookieFont = getCookies("font");
  
  useLayoutEffect(() => {
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
  const themeFromCookie = getCookies("theme");
  const fontFromCookie = getCookies("font");
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!themeFromCookie || themeFromCookie === editorTheme) return;
    if (!fontFromCookie || fontFromCookie === websiteFont) return;

    dispatch(setEditorTheme(themeFromCookie));
    dispatch(setWebsiteFont(fontFromCookie as WebsiteFontsKey));
  }, [themeFromCookie, fontFromCookie, websiteFont, dispatch, editorTheme]);
  return <>{children}</>;
};
