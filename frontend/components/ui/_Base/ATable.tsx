import { ThemeTypes } from "@/@types/theme";
import { Table, TableProps, theme } from "antd";
import React from "react";
import styled from "styled-components";

const StyledTable = styled(Table)<{ $theme: ThemeTypes }>`
  ant-table-cell {
    color: ${({ $theme }) => $theme?.activeColor} !important;
    background: ${({ $theme }) => $theme?.activeColor} !important;
  }
`;

interface IBaseATableProps extends TableProps {
  theme: ThemeTypes;
}

const BaseATable = ({ theme, ...rest }: IBaseATableProps) => {
  return <StyledTable $theme={theme} {...rest} />;
};

export default BaseATable;
