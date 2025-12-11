"use client";
import BaseCDivider from "../_Base/CDivider";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { useSelector } from "react-redux";
export interface CDividerType {
  style?: any;
  className?: string;
  direction?: "horizontal" | "vertical";
}

const CDivider = ({
  style,
  direction = "vertical",
  className = "",
}: CDividerType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <BaseCDivider style={style} className={className} direction={direction} theme={theme} />
  );
};

export default CDivider;
