import { ATable } from "@/components/ui/antd";
import styled from "styled-components";

export const StyledATable = styled(ATable)`
  table > tbody > tr > *:first-child {
    padding: 0px !important;
  }

  table > tbody > tr > *:last-child {
    max-width: 12rem !important;
  }

  table > tbody > tr > *:first-child {
    width: 25rem !important;
  }

  .ant-table-content {
    min-width: 600px !important;
    width: 100% !important;
  }

  .ant-table-container {
    overflow-x: auto !important;
  }

  .ant-table-container::-webkit-scrollbar {
    width: 4px !important;
    height: 8px !important;
  }
  .ant-table-container:hover::-webkit-scrollbar {
    width: 4px !important;
    height: 8px !important;
    transition: opacity 0.3s ease-in-out !important;
  }
  .ant-table-container:hover::-webkit-scrollbar-track {
    background: transparent !important;
  }

  .ant-table-container:hover::-webkit-scrollbar-thumb {
    background-color: rgba(100, 100, 100, 0.418) !important;
    border-radius: 4px !important;
  }
`;
