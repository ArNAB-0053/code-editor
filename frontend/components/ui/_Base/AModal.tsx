"use client";

import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { Modal } from "antd";
import { ModalProps } from "antd/es/modal";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import BaseCButton from "./CButton";

const StyledModal = styled(Modal)<{ $theme: ThemeTypes }>`
  .ant-modal-content,
  .ant-modal-title {
    background-color: ${({ $theme }) => $theme.modalBg} !important;
    color: ${({ $theme }) => $theme.textColor} !important;
    font-family: inherit !important;
  }
  .ant-modal-close-x {
    color: white !important;
  }
`;

interface AModalProps extends ModalProps {
  font: WebsiteFontsKey;
  theme: ThemeTypes;
  useSideIndicator?: boolean;
}

const BaseAModal = ({
  theme,
  font,
  children,
  style,
  title,
  className,
  useSideIndicator = true,
  ...rest
}: AModalProps) => {
  return (
    <StyledModal
      title={
        <>
          <h3 className={`px-2 ${websiteFonts[font]?.className} ${className}`}>
            {title}
          </h3>

          {useSideIndicator && (
            <div
              className="w-4 rounded-r-sm h-[30px] absolute top-4 -left-3"
              style={{
                background: theme.activeColor,
              }}
            />
          )}
        </>
      }
      closeIcon={
        <BaseCButton
          theme={theme}
          useDiv
          type="none"
          variant="transparent"
          hoverColor={theme.activeColor}
          hoverBgColor={`${theme.activeColor}20`}
          className=" transition-all ease-linear duration-100 p-1!"
        >
          <RxCross2 size={18} />
        </BaseCButton>
      }
      $theme={theme}
      {...rest}
      width={{
        xs: "90%",
        sm: "90%",
        md: "85%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      className={`backdrop-blur-lg! ${websiteFonts[font]?.className} ${className}`}
      style={{
        background: theme.border20,
        border: `1px solid transparent`,
        borderRadius: "12px",
        ...style,
      }}
    >
      {children}
    </StyledModal>
  );
};

export default BaseAModal;
