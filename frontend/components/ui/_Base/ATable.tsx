"use client";
import { ThemeTypes } from "@/@types/theme";
import { Table, TableProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import React from "react";
import styled from "styled-components";

// const StyledTable = styled(Table)<{ $theme: ThemeTypes }>`
//   ant-table-cell {
//     color: ${({ $theme }) => $theme?.activeColor} !important;
//     background: ${({ $theme }) => $theme?.activeColor} !important;
//   }
// `;

// interface IBaseATableProps extends TableProps {
//   theme: ThemeTypes;
// }

// const BaseATable = ({ theme, ...rest }: IBaseATableProps) => {
//   return <StyledTable $theme={theme} {...rest} />;
// };

// export default BaseATable;


// Enabled Type Safety.
const StyledWrapper = styled.div<{ $theme: ThemeTypes }>`
  .ant-table-cell {
    color: ${({ $theme }) => $theme?.activeColor} !important;
    background: ${({ $theme }) => $theme?.activeColor} !important;
  }
`;

interface IBaseATableProps<T = AnyObject> extends TableProps<T> {
  theme: ThemeTypes;
}

const BaseATable = <T extends object = AnyObject>({
  theme,
  ...rest
}: IBaseATableProps<T>) => {
  return (
    <StyledWrapper $theme={theme}>
      <Table<T> {...rest} />
    </StyledWrapper>
  );
};

export default BaseATable;
