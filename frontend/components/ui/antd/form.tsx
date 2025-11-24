import { BaseAForm, BaseAItem } from "../_Base";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { FormItemProps } from "antd";
import { IBaseAFormProps } from "@/@types/_base";

export const AForm = ({ children, ...rest }: IBaseAFormProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const WebsiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  return (
    <BaseAForm font={WebsiteFont as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAForm>
  );
};

export const AFormItem = ({ children, ...rest }: FormItemProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const WebsiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);

  return (
    <BaseAItem font={WebsiteFont as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAItem>
  );
};
