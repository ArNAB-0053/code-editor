"use client";
import { BaseCAvatar } from "../_Base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import { WebsiteFontsKey } from "@/@types/font";
import { BaseAvatarProps } from "../_Base/CAvatar";

const NRCAvatar = ({
  name,
  className,
  style,
  variant = "default",
  characters,
  initials,
  type
}: BaseAvatarProps) => {
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
      initials={initials}
      type={type}
    />
  );
};

export default NRCAvatar;
