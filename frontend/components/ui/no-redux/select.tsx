"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { SelectProps } from "antd";
import BaseASelect from "../_Base/ASelect";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";

const NRASelect = ({ children, ...rest }: SelectProps) => {
  const { theme, cookieTheme } = useCookieTheme();
  const { font } = useCookieFont();

  return (
    <BaseASelect
      theme={theme}
      font={font as WebsiteFontsKey}
      themeName={cookieTheme}
      {...rest}
    >
      {children}
    </BaseASelect>
  );
};

export default NRASelect;
