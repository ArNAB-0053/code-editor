import { AModal } from "@/components/ui/antd";
import styled from "styled-components";

export const StyledAModal = styled(AModal)`
  .ant-modal-content {
    padding: 0 !important;
  }
`;

export * from "./confirm-delete"
export * from "./rename"