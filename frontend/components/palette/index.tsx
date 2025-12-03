"use client";
import { NRCButton, NRDrawer } from "../ui/no-redux";
import { RiPaintFill } from "react-icons/ri";
import { editorThemes } from "@/constants/preference-constants";
import { EditorThemeOptionsTypes } from "@/@types/theme";
import { themeConfig } from "@/config/themeConfig";
import {
  ThemeColorPaletteHeader,
  ThemeFontPaletteHeader,
} from "./palette-header";
import ThemeBlobSVG from "@/assets/ThemeBlobSVG";
import { websiteFonts } from "@/fonts";
import { getFontLabel } from "@/helper/font-style";
import { WebsiteFontsKey } from "@/@types/font";
import { useTheme } from "@/context/ThemeContext";
import { useFont } from "@/context/FontProvider";
import { cn } from "@/lib/utils";

export type ThemeOptions = {
  value: string;
  label: string;
  activeColor: string;
};

export const ThemePalette = () => {
  const { font } = useFont();
  const { themeName, updateTheme } = useTheme();
  const theme = themeConfig(themeName);

  const themeOptions = Object.entries(
    editorThemes as EditorThemeOptionsTypes
  ).map(([key, label]) => ({
    value: key,
    label,
    activeColor: themeConfig(key)?.activeColor,
  }));

  return (
    <NRDrawer
      title="Color Palette"
      OpenBtn={
        <NRCButton
          type="none"
          variant="transparent"
          hoverColor={theme.activeColor}
          hoverBgColor={`${theme.activeColor}20`}
          className="aspect-square! rounded-full! p-2!"
        >
          <RiPaintFill size={17} />
        </NRCButton>
      }
      className="z-20!"
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
              ${themeName === x.value ? "opacity-80!" : "opacity-100!"} 
              hover:opacity-80!
            `}
            // hoverBgColor={`${x.activeColor}20`}
            hoverColor={`${x.activeColor}`}
            style={{
              backgroundColor:
                themeName === x.value
                  ? `${x.activeColor}80`
                  : `${x.activeColor}40`,
              borderColor:
                themeName === x.value ? `${x.activeColor}80` : "transparent",
              lineHeight: "16px",
              padding: "0 20px",
            }}
            onClick={() => updateTheme(x.value)}
          >
            {x.label}
            <ThemeBlobSVG theme={x} />
          </NRCButton>
        ))}
      </div>
    </NRDrawer>
  );
};

export const FontPalette = () => {
  const { fontName, updateFont } = useFont();
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const fontOptions = Object.entries(websiteFonts).map(([key]) => ({
    value: key,
    label: getFontLabel(key),
    font: websiteFonts[key as WebsiteFontsKey],
  }));

  console.log(fontOptions);

  return (
    <NRDrawer
      title="Font Palette"
      OpenBtn={
        <NRCButton
          type="none"
          variant="transparent"
          hoverColor={theme.activeColor}
          hoverBgColor={`${theme.activeColor}20`}
          className="aspect-square! rounded-full! group p-2!"
        >
          <p className="text-base underline underline-offset-6 italic">Aa</p>
        </NRCButton>
      }
      className="z-20!"
      closeIcon={false}
    >
      {/* Font */}
      <ThemeFontPaletteHeader />
      <div className="grid grid-cols-3 gap-x-3 gap-y-3 w-full mb-10">
        {fontOptions?.map((x, idx) => (
          <NRCButton
            type="none"
            variant="transparent"
            key={idx}
            className={`
              ${x?.font?.className} 
              group h-16! w-full! border-2! border-white/10! relative! overflow-hidden! 
              ${themeName === x.value ? "opacity-80!" : "opacity-100!"} 
              hover:opacity-80! transition-all! duration-200! ease-linear!
            `}
            // hoverBgColor={`${x.activeColor}20`}
            // hoverColor={`${x.activeColor}`}
            style={{
              backgroundColor:
                fontName === x.value ? `${theme.activeColor}30` : "",
              // borderColor:
              //   cookieTheme === x.value ? `${x.activeColor}80` : "transparent",
              lineHeight: "16px",
              // padding: "0 5px",
            }}
            onClick={() => updateFont(x.value)}
          >
            <span
              className={cn(
                "absolute -left-2 top-2 text-[7rem] tracking-tighter rotate-15 opacity-10 group-hover:opacity-30 transition-all duration-200 ease-linear",
                x?.font?.className
              )}
            >
              Aa
            </span>
            <span className={x?.font?.className}>{x.label}</span>
          </NRCButton>
        ))}
      </div>
    </NRDrawer>
  );
};
