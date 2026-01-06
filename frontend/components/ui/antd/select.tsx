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

interface ASelectProps extends SelectProps {
  optionBorderRadius?: string;
}

const ASelect = ({ children, optionBorderRadius, ...rest }: ASelectProps) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <BaseASelect
      theme={theme}
      font={websiteFont as WebsiteFontsKey}
      themeName={editorTheme}
      optionBorderRadius={optionBorderRadius}
      {...rest}
    >
      {children}
    </BaseASelect>
  );
};

export default ASelect;
