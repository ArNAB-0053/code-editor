import { WebsiteFontsKey, WebsiteFontsMap } from "@/@types/font";
import { Card, CardProps } from "antd";
import React from "react";
import styled from "styled-components";

export interface IACardProps extends CardProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  children?: React.ReactNode;
  useSideIndicator?: boolean;
}

export interface IBaseACardProps extends IACardProps {
  font: WebsiteFontsMap[WebsiteFontsKey];
}

const StyledBaseACard = styled(Card)`
  .ant-card-head {
    border-bottom: 2px solid var(--border10) !important;
  }
`;

const BaseACard = ({
  title,
  style,
  font,
  className,
  children,
  useSideIndicator = true,
  ...rest
}: IBaseACardProps) => {
  return (
    <StyledBaseACard
      title={
        <>
          <h3
            className={`px-2 ${font?.className} font-semibold! ${className}`}
            style={{
              color: 'var(--activeColor)',
            }}
          >
            {title}
          </h3>

          {useSideIndicator && (
            <div
              className="w-4 rounded-r-sm h-[35px] absolute top-2 -left-3"
              style={{
                background: 'var(--activeColor)',
              }}
            />
          )}
        </>
      }
      style={{ width: "400px", overflowX: "hidden", ...style }}
      className={className}
      {...rest}
    >
      {children}
    </StyledBaseACard>
  );
};

export default BaseACard;
