import { themeConfig } from "@/config/themeConfig";
import { useCookieFont, useCookieItems } from "@/hooks/useItemFromCookie";
import React from "react";

export const ThemeColorPaletteHeader = () => {
  const { cookieTheme } = useCookieItems();
  const { font } = useCookieFont();
  return (
    <div className="flex items-center gap-x-3 mb-4">
      <div
        style={{ background: `${themeConfig(cookieTheme).activeColor}70` }}
        className="w-6 h-6 rounded-sm flex items-center justify-center"
      >
        <div
          style={{ background: themeConfig(cookieTheme).activeColor }}
          className="w-3 h-3 rounded-xs "
        />
      </div>

      <h1
        className={`${font?.className}  text-white/80 tracking-wider text-sm`}
      >
        Color Palette
      </h1>
    </div>
  );
};

export const ThemeFontPaletteHeader = () => {
  const { cookieTheme } = useCookieItems();
  const { font } = useCookieFont();
  return (
    <div className="flex items-center gap-x-3 mb-4">
      <span className="border-b-2">
        <p className="text-xl -translate-y-1">Aa</p>
      </span>

      <h1
        className={`${font?.className}  text-white/80 tracking-wider text-sm`}
      >
        Font
      </h1>
    </div>
  );
};

