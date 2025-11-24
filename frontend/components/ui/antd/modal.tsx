"use client";
import { themeConfig } from "@/config/themeConfig";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { ModalProps } from "antd/es/modal";
import { useSelector } from "react-redux";
import { BaseAModal } from "../_Base";

interface ModalExtraProps {
  useSideIndicator?: boolean;
}

type AModalProps = ModalProps & ModalExtraProps;

const AModal = ({
  children,
  style,
  title,
  className,
  useSideIndicator = true,
  ...rest
}: AModalProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);

  return (
    <BaseAModal
      theme={theme}
      font={websiteFont as WebsiteFontsKey}
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

export default AModal;
