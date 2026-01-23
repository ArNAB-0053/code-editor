"use client";
import { BaseAPopover, GlobalPopoverStyle } from "../_Base";
import { PopoverProps } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";

interface APopoverProps extends PopoverProps {
  fontClass?: NextFont;
  useSideIndicator?: boolean;
  fontName?: WebsiteFontsKey;
}

export const NRAPopover = ({
  children,
  fontClass,
  fontName,
  ...rest
}: APopoverProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { font } = useFont();

  return (
    <>
      <GlobalPopoverStyle $theme={theme} />
      <BaseAPopover
        fontName={fontName}
        fontClass={font ?? fontClass}
        theme={theme}
        {...rest}
      >
        {children}
      </BaseAPopover>
    </>
  );
};
