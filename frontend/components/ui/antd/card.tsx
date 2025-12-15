"use client";
import { useSelector } from "react-redux";
import BaseACard, { IACardProps } from "../_Base/ACard";
import {
  selectEditorFont,
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

const ACard = ({ title, style, className, children, ...rest }: IACardProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <BaseACard
      theme={theme}
      font={font}
      title={title}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </BaseACard>
  );
};

export default ACard;
