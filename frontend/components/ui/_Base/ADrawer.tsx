import { useState, cloneElement, isValidElement, ReactElement } from "react";
import { Drawer, DrawerProps } from "antd";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import BaseCButton from "./CButton";
import { RxCross2 } from "react-icons/rx";

export interface ADrawerProps extends DrawerProps {
  OpenBtn: ReactElement<{ onClick: () => void }>;
  useSideIndicator?: boolean;
}

export interface BaseADrawerProps extends ADrawerProps {
  theme: ThemeTypes;
  font: WebsiteFontsKey;
}

const StyledDrawer = styled(Drawer)<{ $theme: ThemeTypes }>`
  .ant-drawer-content,
  .ant-drawer-content-wrapper,
  .ant-drawer-header,
  .ant-drawer-body {
    background: ${({ $theme }) => $theme?.border10} !important;
    color: ${({ $theme }) => $theme?.textColor} !important;
  }

  .ant-drawer-close {
    color: ${({ $theme }) => $theme?.textColor} !important;
  }

  .ant-drawer-header {
    border-bottom: 1px solid ${({ $theme }) => $theme?.border20} !important;
  }
`;

export const BaseADrawer = ({
  theme,
  font,
  style,
  useSideIndicator = true,
  title,
  OpenBtn,
  children,
  className,
  closeIcon,
  ...rest
}: BaseADrawerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {isValidElement(OpenBtn) &&
        cloneElement(OpenBtn, {
          onClick: () => setOpen(true),
        })}

      <StyledDrawer
        $theme={theme}
        title={
          <div className="flex items-center justify-between">
            <h1
              className={`${websiteFonts[font]?.className} font-semibold translate-y-px`}
            >
              {title}
            </h1>
            <BaseCButton
              theme={theme}
              type="none"
              variant="transparent"
              hoverColor={theme?.activeColor}
              hoverBgColor={`${theme?.activeColor}20`}
              className=" transition-all ease-linear duration-100 p-1!"
              onClick={() => setOpen(false)}
            >
              <RxCross2 size={18} />
            </BaseCButton>

            {useSideIndicator && (
              <div
                className="w-4 rounded-r-sm h-[30px] absolute top-4 -left-3"
                style={{
                  background: theme?.activeColor,
                }}
              />
            )}
          </div>
        }
        onClose={() => setOpen(false)}
        open={open}
        closeIcon={closeIcon}
        style={{
          background: "transparent",
          ...style,
        }}
        className={`${className} `}
        {...rest}
      >
        {children}
      </StyledDrawer>
    </>
  );
};
