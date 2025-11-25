"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { SelectProps } from "antd";
import BaseASelect from "../_Base/ASelect";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

const NRASelect = ({ children, ...rest }: SelectProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();

  return (
    <BaseASelect
      theme={theme}
      font={fontName as WebsiteFontsKey}
      themeName={themeName}
      {...rest}
    >
      {children}
    </BaseASelect>
  );
};

export default NRASelect;
