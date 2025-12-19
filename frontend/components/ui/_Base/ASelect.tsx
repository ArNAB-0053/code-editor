"use client";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { Select, SelectProps } from "antd";
import styled, { createGlobalStyle } from "styled-components";
import { IExtraProps } from "@/@types/_base";
import { cn } from "@/lib/utils";

interface BaseASelectProps extends SelectProps, IExtraProps {
  themeName?: string;
}

const StyledBaseASelect = styled(Select)<{ $theme: ThemeTypes }>`
  .ant-select-selector {
    background: ${({ $theme }) => $theme.editorBackground} !important;
    color: ${({ $theme }) => $theme.outputColor} !important;
    border-color: ${({ $theme }) => $theme.border} !important;
  }

  .ant-select-arrow {
    color: ${({ $theme }) => $theme.textColor} !important;
  }

  .ant-select-selection-item {
    color: ${({ $theme }) => $theme.textColor} !important;
  }
`;

const DropdownGlobal = createGlobalStyle<{
  cls: string;
  editorBackground: string;
  outputColor: string;
  border10: string;
  selectionBg: string;
  border5: string
}>`
  .${(p) => p.cls} .ant-select-dropdown {
    background: ${(p) => p.outputColor} !important;
    color: ${(p) => p.outputColor} !important;
    border: 1px solid ${(p) => p.border10} !important;
    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
    
  }

  .${(p) => p.cls} .ant-select-item-option {
    background: transparent;
    color: ${(p) => p.outputColor} !important;
    margin-bottom: 6px !important;
    width: 100%;
    border-radius: 12px !important;
  }

  .${(p) => p.cls} .ant-select-item-option-active,
  .${(p) => p.cls} .ant-select-item-option-selected {
    background: ${(p) => p.border10} !important;
    width: 100%;
  }

  .${(p) => p.cls} .ant-select-item-option-content {
    color: ${(p) => p.outputColor} !important;
  }

  /* optional: hovered option */
  .${(p) => p.cls} .ant-select-item-option:hover {
    background: ${(p) => p.border10} !important;
    width: 100%;
  }
`;

const BaseASelect = ({
  children,
  theme,
  font,
  themeName,
  ...rest
}: BaseASelectProps) => {
  const dropdownClass = `a-select-dropdown-${themeName?.replace(
    /[^a-z0-9\-]/gi,
    ""
  )}`;

  return (
    <>
      <DropdownGlobal
        cls={dropdownClass}
        editorBackground={theme.editorBackground}
        outputColor={theme.textColor}
        border10={theme.border10 ?? theme.border15 ?? theme.border}
        selectionBg={theme.editorSelectionBackground}
        border5={theme.border5}
      />

      <StyledBaseASelect
        $theme={theme}
        style={{
          borderRadius: "12px",
        }}
        styles={{
          popup: {
            root: {
              fontWeight: "normal",
              background: theme.border5,
              backdropFilter: "blur(25px)",
              padding: "8px 8px 4px 8px",
              borderRadius: '14px',
            },
          },
        }}
        classNames={{
          popup: {
            root: cn(
              dropdownClass,
              websiteFonts[font as WebsiteFontsKey]?.className,
            ),
          },
        }}
        className={cn(websiteFonts[font as WebsiteFontsKey]?.className)}
        // dropdownStyle={{
        //   fontFamily: websiteFont,
        //   fontWeight: "normal",
        //   background: theme.editorBackground,
        //   backdropFilter: "blur(10px)",
        // }}
        // dropdownClassName={dropdownClass}
        {...rest}
      >
        {children}
      </StyledBaseASelect>
    </>
  );
};

export default BaseASelect;
