"use client";
import { IExtraProps } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { Popover, PopoverProps } from "antd";
import { ReactNode } from "react";
import { createGlobalStyle } from "styled-components";

export const GlobalPopoverStyle = createGlobalStyle<{ $theme: ThemeTypes }>`
    .ant-popover-arrow::before {
        background: ${({ $theme }) => $theme?.border} !important;
    }
    .ant-popover-inner {
        top: 10px;
        padding: 6px !important;
    }
`;

interface IBaseAPopoverProps extends PopoverProps, IExtraProps {
  useSideIndicator?: boolean;
  fontName?: WebsiteFontsKey;
}

export const BaseAPopover = ({
  children,
  theme,
  fontClass,
  className,
  title,
  useSideIndicator = false,
  styles,
  classNames,
  fontName,
  ...rest
}: IBaseAPopoverProps) => {
  return (
    <Popover
      placement="bottom"
      title={
        title && (
          <>
            <h3
              className={cn(
                "px-2",
                fontName
                  ? websiteFonts[fontName]
                  : fontClass && fontClass?.className,
                className
              )}
            >
              {title as ReactNode}
            </h3>

            {useSideIndicator && (
              <div
                className="w-4 rounded-r-sm h-[30px] absolute top-4 -left-3"
                style={{
                  background: theme.activeColor,
                }}
              />
            )}
          </>
        )
      }
      styles={{
        root: {
          background: `${theme.activeColor}50`,
          backdropFilter: "blur(20px)",
          borderRadius: "12px",
          padding: "0px",
        },
        ...styles,
      }}
      classNames={{
        root: "-mt-4!",
        ...classNames,
      }}
      {...rest}
    >
      {children}
    </Popover>
  );
};
