import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

interface IEmptyContent {
  boxClassName?: string;
  boxStyle?: React.CSSProperties;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  title: string;
}

export const EmptyBox = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  return (
    <Image
      src="/empty-inbox.png"
      width={400}
      height={400}
      alt=""
      className={cn(
        "w-16 invert brightness-10 contrast-50 grayscale",
        className
      )}
      style={style}
    />
  );
};

export const EmptyContent = ({
  title,
  boxClassName,
  boxStyle,
  titleClassName,
  titleStyle,
}: IEmptyContent) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <EmptyBox className={boxClassName} style={boxStyle} />
      <p
        className={cn("text-xs", font?.className, titleClassName)}
        style={{
          color: theme.disabledTextColor,
          ...titleStyle,
        }}
      >
        {title}
      </p>
    </div>
  );
};
