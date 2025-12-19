"use client";
import { BaseATable } from "../_Base";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { TableProps } from "antd";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

export const ATable = ({ className, ...rest }: TableProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const WebsiteFont = useSelector(selectWebsiteFont);
  const fontClass = websiteFonts[WebsiteFont as WebsiteFontsKey];

  return (
    <BaseATable
      theme={theme}
      className={className}
      fontClass={fontClass}
      {...rest}
    />
  );
};
