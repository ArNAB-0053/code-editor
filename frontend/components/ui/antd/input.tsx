"use client";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme, selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { InputProps } from "antd";
import { useSelector } from "react-redux";
import { BaseAInput } from "../_Base";
import { WebsiteFontsKey } from "@/@types/font";

const AInput = (props: InputProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const WebsiteFont = useSelector(selectWebsiteFont)
  const theme = themeConfig(editorTheme);

  // console.log(WebsiteFont)

  return <BaseAInput font={WebsiteFont as WebsiteFontsKey} theme={theme} {...props} />;
};

export default AInput;
