"use client";
import { useSelector } from "react-redux";
import BaseACard, { IACardProps } from "../_Base/ACard";
import {
  selectEditorFont,
  selectEditorTheme,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";

const ACard = ({
  title,
  style,
  className,
  children,
  ...rest
}: IACardProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const font = useSelector(selectEditorFont);
  return (
    <BaseACard
      theme={theme}
      font={font}
      title={title}
      style={style}
      className={className}
      {...rest}
    >
      {children}
    </BaseACard>
  );
};

export default ACard;
