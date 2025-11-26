"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { ModalProps } from "antd/es/modal";
import { BaseAModal } from "../_Base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

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
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();

  return (
    <BaseAModal
      theme={theme}
      font={fontName as WebsiteFontsKey}
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
