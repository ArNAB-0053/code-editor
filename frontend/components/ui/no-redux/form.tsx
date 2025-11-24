import { BaseAForm, BaseAItem } from "../_Base";
import { WebsiteFontsKey } from "@/@types/font";
import { FormItemProps } from "antd";
import { IBaseAFormProps } from "@/@types/_base";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";

export const NRAForm = ({ children, ...rest }: IBaseAFormProps) => {
  const { theme } = useCookieTheme();
  const { cookieFont } = useCookieFont();
  return (
    <BaseAForm font={cookieFont as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAForm>
  );
};

export const NRAFormItem = ({ children, ...rest }: FormItemProps) => {
  const { theme } = useCookieTheme();
  const { cookieFont } = useCookieFont();

  return (
    <BaseAItem font={cookieFont as WebsiteFontsKey} theme={theme} {...rest}>
      {children}
    </BaseAItem>
  );
};
