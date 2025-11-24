"use client";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { SelectProps } from "antd";
import { useSelector } from "react-redux";
import BaseASelect from "../_Base/ASelect";

const ASelect = ({ children, ...rest }: SelectProps) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <BaseASelect
      theme={theme}
      font={websiteFont as WebsiteFontsKey}
      themeName={editorTheme}
      {...rest}
    >
      {children}
    </BaseASelect>
  );
};

export default ASelect;
