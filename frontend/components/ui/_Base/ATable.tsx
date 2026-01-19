"use client";
import { IExtraProps } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { Table, TableProps } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";
import styled from "styled-components";

// Enabled Type Safety.
const StyledWrapper = styled.div<{ $theme: ThemeTypes; $fontClass: NextFont }>`
  .ant-table-cell {
    color: ${({ $theme }) => $theme?.textColor} !important;
    background: transparent !important;
  }

  .ant-table-thead {
    color: ${({ $theme }) => $theme?.textColor} !important;
    background: ${({ $theme }) => $theme?.border10} !important;
  }

  .ant-table-tbody {
    color: ${({ $theme }) => $theme?.textColor} !important;
    background: ${({ $theme }) => $theme?.border5} !important;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none !important;
  }

  table > tbody > tr:last-child > *:last-child {
    border-end-end-radius: 8px !important;
  }

  table > tbody > tr:last-child > *:first-child {
    border-end-start-radius: 8px !important;
  }

  .ant-table {
    background: transparent !important;
  }

  .ant-table-cell {
    border: ${({ $theme }) => `1px solid ${$theme?.border10}`} !important;
    font-family: ${({ $fontClass }) => $fontClass.style.fontFamily} !important;
  }

  .ant-table-thead > tr > th {
    border-bottom: ${({ $theme }) =>
      `1px solid ${$theme?.border10}`} !important;
  }

  .ant-pagination-item {
    background: ${({ $theme }) => $theme?.border15} !important;
    border: none !important;
  }

  .ant-pagination-item a {
    font-family: ${({ $fontClass }) => $fontClass.style.fontFamily} !important;
    color: ${({ $theme }) => $theme?.textColor} !important;
  }

  .anticon {
    color: ${({ $theme }) => $theme?.textColor} !important;
  }
`;

interface IBaseATableProps extends TableProps, IExtraProps {}

const BaseATable = ({
  theme,
  font,
  fontClass,
  className,
  ...rest
}: IBaseATableProps) => {
  const normalizedScroll =
    rest.scroll && typeof rest.scroll === "object"
      ? {
          ...rest.scroll,
          y: typeof rest.scroll.y === "number" ? rest.scroll.y : undefined,
        }
      : rest.scroll;

  return (
    <StyledWrapper
      $theme={theme}
      $fontClass={fontClass || websiteFonts[font as WebsiteFontsKey]}
      className={
        fontClass
          ? fontClass?.className
          : websiteFonts[font as WebsiteFontsKey]?.className
      }
    >
      <Table
        className={cn(
          fontClass
            ? fontClass?.className
            : websiteFonts[font as WebsiteFontsKey]?.className,
          className
        )}
        scroll={normalizedScroll}
        {...rest}
      />
    </StyledWrapper>
  );
};

export default BaseATable;
