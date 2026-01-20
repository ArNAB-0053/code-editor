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
import React from "react";

interface ASelectProps extends SelectProps {
  optionBorderRadius?: string;
  dropdownElementMarginBottom?: string;
  dropdownRadius?: string;
  dropdownStyle?: React.CSSProperties;
  dropdownItemPadding?: string;
  dropdownItemMinHeight?: string;
}

const ASelect = ({
  children,
  optionBorderRadius,
  dropdownRadius,
  dropdownStyle,
  dropdownElementMarginBottom,
  dropdownItemMinHeight,
  dropdownItemPadding,
  ...rest
}: ASelectProps) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <BaseASelect
      theme={theme}
      font={websiteFont as WebsiteFontsKey}
      themeName={editorTheme}
      optionBorderRadius={optionBorderRadius}
      dropdownRadius={dropdownRadius}
      dropdownStyle={dropdownStyle}
      dropdownElementMarginBottom={dropdownElementMarginBottom}
      dropdownItemPadding={dropdownItemPadding}
      dropdownItemMinHeight={dropdownItemMinHeight}
      {...rest}
    >
      {children}
    </BaseASelect>
  );
};

export default ASelect;
