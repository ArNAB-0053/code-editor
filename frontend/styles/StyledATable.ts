import { ThemeTypes } from "@/@types/theme";
import { ATable } from "@/components/ui/antd";
import styled from "styled-components";

export const StyledATable = styled(ATable)<{
  $theme: ThemeTypes;
}>`
  table > tbody > tr > *:first-child {
    padding: 0px !important;
  }

  table > tbody > tr > *:last-child {
    max-width: 12rem !important;
  }

  table > tbody > tr > *:first-child {
    width: 25rem !important;
  }

  .ant-table-container {
    .ant-table-body,
    .ant-table-content {
      scrollbar-width: thin;
      scrollbar-color: transparent transparent;
      padding-bottom: 8px !important;
      transition: all 0.1s ease-in-out;
    }
    .ant-table-content:hover {
      scrollbar-color: ${({ $theme }) => $theme?.activeColor} transparent;
    }
  }

  .ant-table-expanded-row-fixed,
  .ant-table-tbody > tr.ant-table-placeholder {
    background: transparent !important;
    padding: 0px !important;
  }
`;
