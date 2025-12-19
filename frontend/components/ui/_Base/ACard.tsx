import { WebsiteFontsKey, WebsiteFontsMap } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { cn } from "@/lib/utils";
import { Card, CardProps } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

export interface IACardProps extends CardProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  useSideIndicator?: boolean;
}

export interface IBaseACardProps extends IACardProps {
  font: NextFont;
  theme: ThemeTypes;
}

const StyledBaseACard = styled(Card)<{ $theme: ThemeTypes }>`
  .ant-card-head {
    border-bottom: ${({ $theme }) =>
      `2px solid ${$theme?.border10}`} !important;
  }
`;

const BaseACard = ({
  title,
  style,
  font,
  className,
  children,
  useSideIndicator = true,
  theme,
  ...rest
}: IBaseACardProps) => {
  return (
    <StyledBaseACard
      $theme={theme}
      title={
        title && (
          <>
            <h3
              className={`px-2 ${font?.className} font-semibold! ${className}`}
              style={{
                color: theme?.activeColor,
              }}
            >
              {title}
            </h3>

            {useSideIndicator && (
              <div
                className="w-4 rounded-r-sm h-[35px] absolute top-2 -left-3"
                style={{
                  background: theme?.activeColor,
                }}
              />
            )}
          </>
        )
      }
      style={{ width: "400px", overflowX: "hidden", ...style }}
      className={cn("relative", font?.className, className)}
      {...rest}
    >
      {children}
    </StyledBaseACard>
  );
};

export default BaseACard;
