import React from "react";
import { NRCButton, NRDrawer } from "../ui/no-redux";
import { RiPaintFill } from "react-icons/ri";
import { useCookieFont, useCookieItems } from "@/hooks/useItemFromCookie";
import { editorThemes } from "@/constants/preference-constants";
import { EditorThemeOptionsTypes } from "@/@types/theme";
import { themeConfig } from "@/config/themeConfig";
import {
  ThemeColorPaletteHeader,
  ThemeFontPaletteHeader,
} from "./theme-palette-header";
import ThemeBlobSVG from "@/assets/ThemeBlobSVG";
import { websiteFonts } from "@/fonts";
import { getFontLabel } from "@/helper/font-style";
import { WebsiteFontsKey } from "@/@types/font";

export type ThemeOptions = {
  value: string;
  label: string;
  activeColor: string;
};

const ThemePalette = () => {
  const { theme, cookieTheme } = useCookieItems();
  const { font } = useCookieFont();

  const themeOptions = Object.entries(
    editorThemes as EditorThemeOptionsTypes
  ).map(([key, label]) => ({
    value: key,
    label,
    activeColor: themeConfig(key)?.activeColor,
  }));

  const fontOptions = Object.entries(websiteFonts).map(([key]) => ({
    value: key,
    label: getFontLabel(key),
    font: websiteFonts[key as WebsiteFontsKey],
  }));

  // console.log(fontOptions);

  return (
    <NRDrawer
      title="Color Palette"
      OpenBtn={
        <NRCButton
          type="none"
          variant="transparent"
          hoverColor={theme.activeColor}
          hoverBgColor={`${theme.activeColor}20`}
          className="aspect-square! rounded-full!"
        >
          <RiPaintFill size={17} />
        </NRCButton>
      }
      closeIcon={false}
    >
      {/* Color Paletter */}
      <ThemeColorPaletteHeader />
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-full mb-10">
        {themeOptions?.map((x, idx) => (
          <NRCButton
            type="none"
            variant="transparent"
            key={idx}
            className={`
              ${font?.className} 
              h-[70px]! w-full! border-2! relative! overflow-hidden! 
              ${cookieTheme === x.value ? "opacity-80!" : "opacity-100!"} 
              hover:opacity-80!
            `}
            // hoverBgColor={`${x.activeColor}20`}
            hoverColor={`${x.activeColor}`}
            style={{
              background:
                cookieTheme === x.value
                  ? `${x.activeColor}80`
                  : `${x.activeColor}40`,
              borderColor:
                cookieTheme === x.value ? `${x.activeColor}80` : "transparent",
              lineHeight: "16px",
              padding: "0 20px",
            }}
          >
            {x.label}
            <ThemeBlobSVG theme={x} />
          </NRCButton>
        ))}
      </div>

      {/* Font */}
      <ThemeFontPaletteHeader />
      <div className="grid grid-cols-2 gap-x-3 gap-y-3 w-full mb-10">
        {fontOptions?.map((x, idx) => (
          <NRCButton
            type="none"
            variant="transparent"
            key={idx}
            className={`
              ${x?.font?.className} 
              group h-10! w-full! border-2! border-white/10! relative! overflow-hidden! 
              ${cookieTheme === x.value ? "opacity-80!" : "opacity-100!"} 
              hover:opacity-80! transition-all! duration-200! ease-linear!
            `}
            // hoverBgColor={`${x.activeColor}20`}
            // hoverColor={`${x.activeColor}`}
            style={{
              // background:
              //   cookieTheme === x.value
              //     ? `${x.activeColor}80`
              //     : `${x.activeColor}40`,
              // borderColor:
              //   cookieTheme === x.value ? `${x.activeColor}80` : "transparent",
              lineHeight: "16px",
              // padding: "0 5px",
            }}
          >
            <span className="absolute left-0 top-0 text-[7rem] rotate-15 opacity-10 group-hover:opacity-30 transition-all duration-200 ease-linear">
              Aa
            </span>
            {x.label}
          </NRCButton>
        ))}
      </div>
    </NRDrawer>
  );
};

export default ThemePalette;
