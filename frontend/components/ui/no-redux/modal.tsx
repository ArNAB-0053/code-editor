"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { ModalProps } from "antd/es/modal";
import { BaseAModal } from "../_Base";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";

interface ModalExtraProps {
  useSideIndicator?: boolean;
}

type AModalProps = ModalProps & ModalExtraProps;

const NRAModal = ({
  children,
  style,
  title,
  className,
  useSideIndicator = true,
  ...rest
}: AModalProps) => {
  const { theme } = useCookieTheme();
  const { cookieFont } = useCookieFont();

  return (
    <BaseAModal
      theme={theme}
      font={cookieFont as WebsiteFontsKey}
      style={style}
      title={title}
      className={className}
      useSideIndicator={useSideIndicator}
      {...rest}
    >
      {children}
    </BaseAModal>
  );
};

export default NRAModal;
