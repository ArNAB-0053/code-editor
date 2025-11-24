"use client";
import { InputProps } from "antd";
import { BaseAInput } from "../_Base";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";
import { WebsiteFontsKey } from "@/@types/font";

const NRAInput = (props: InputProps) => {
  const { theme } = useCookieTheme();
  const { font } = useCookieFont();
  // console.log(font)
  return <BaseAInput font={font as WebsiteFontsKey} theme={theme} {...props} />;
};

export default NRAInput;
