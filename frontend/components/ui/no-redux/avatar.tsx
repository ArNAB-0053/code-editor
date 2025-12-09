"use client";
import { BaseCAvatar } from "../_Base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { IBaseStylingProps, NameObjType } from "@/@types/_base";
import { useFont } from "@/context/FontProvider";
import { WebsiteFontsKey } from "@/@types/font";

export interface NRCAvatarProps extends IBaseStylingProps {
  variant?: "transparent" | "default" | "noBorder" | "none";
  name: NameObjType;
  characters?: number;
}

const NRCAvatar = ({
  name,
  className,
  style,
  variant = "default",
  characters,
}: NRCAvatarProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  const { fontName } = useFont();
  return (
    <BaseCAvatar
      font={fontName as WebsiteFontsKey}
      name={name}
      theme={theme}
      className={className}
      style={style}
      variant={variant}
      characters={characters}
    />
  );
};

export default NRCAvatar;
