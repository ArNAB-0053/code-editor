"use client"
import { BaseAPopover, GlobalPopoverStyle } from "../_Base";
import { PopoverProps } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

interface APopoverProps extends PopoverProps {
  fontClass?: NextFont;
  useSideIndicator?: boolean;
  fontName?: WebsiteFontsKey;
}

export const APopover = ({
  children,
  fontClass,
  fontName,
  ...rest
}: APopoverProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

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
