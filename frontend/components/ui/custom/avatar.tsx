"use client";
import { BaseCAvatar } from "../_Base";
import { themeConfig } from "@/config/themeConfig";
import { IBaseStylingProps, NameObjType } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

export interface CAvatarProps extends IBaseStylingProps {
  variant?: "transparent" | "default" | "noBorder" | "none";
  name?: NameObjType;
  characters?: number;
  type?: "string" | "object";
  initials?: string;
}

export const CAvatar = ({
  name,
  className,
  style,
  variant = "default",
  characters,
  type,
  initials,
}: CAvatarProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  return (
    <BaseCAvatar
      type={type}
      initials={initials}
      font={websiteFont as WebsiteFontsKey}
      name={name}
      theme={theme}
      className={className}
      style={style}
      variant={variant}
      characters={characters}
    />
  );
};
