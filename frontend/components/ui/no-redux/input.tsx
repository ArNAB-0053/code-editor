"use client";
import { InputProps } from "antd";
import { BaseAInput } from "../_Base";
import { WebsiteFontsKey } from "@/@types/font";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

const NRAInput = (props: InputProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();
  // console.log(font)
  return <BaseAInput font={fontName as WebsiteFontsKey} theme={theme} {...props} />;
};

export default NRAInput;
