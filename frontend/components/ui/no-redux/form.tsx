import { BaseAForm, BaseAItem } from "../_Base";
import { WebsiteFontsKey } from "@/@types/font";
import { FormItemProps } from "antd";
import { IBaseAFormProps, IBaseCustomProps } from "@/@types/_base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import { jetBrainsMono, play_us_modern, spaceGrotesk } from "@/fonts";

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

export const NRCFormLabel = ({
  children,
  style,
  className,
}: IBaseCustomProps) => {
  const { font } = useFont();

  const { themeName } = useTheme();
  const theme = themeConfig(themeName);

  return (
    <h4 className={`${jetBrainsMono.className} relative font-medium translate-y-2 ${className}`} style={{
      color: theme.disabledTextColor,
      fontSize: '12px',
      ...style
    }}>
      {children}
    </h4>
  );
};
