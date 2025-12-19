import { ThemeTypes } from "@/@types/theme";
import Link from "next/link";
import styled from "styled-components";

export const StyledDiv = styled.div<{ $theme: ThemeTypes }>`
  &:hover {
    color: ${({ $theme }) => $theme.activeColor} !important;
  }
`;

export const StyledDivBG = styled.div<{ $theme: ThemeTypes }>`
  &:hover {
    background-color: ${({ $theme }) => $theme.activeColor}20 !important;
  }
`;

export const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
  &:hover {
    color: ${({ $theme }) => $theme.activeColor} !important;
  }
`;