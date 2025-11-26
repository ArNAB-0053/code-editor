import { BaseAForm, BaseAItem } from "../_Base";
import { WebsiteFontsKey } from "@/@types/font";
import { FormItemProps } from "antd";
import { IBaseAFormProps } from "@/@types/_base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

export const NRAForm = ({ children, ...rest }: IBaseAFormProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();
  return (
    <BaseAForm font={fontName as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAForm>
  );
};

export const NRAFormItem = ({ children, ...rest }: FormItemProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();

  return (
    <BaseAItem font={fontName as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAItem>
  );
};
