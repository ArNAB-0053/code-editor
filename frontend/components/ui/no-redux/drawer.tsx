import { ADrawerProps, BaseADrawer } from "../_Base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import { WebsiteFontsKey } from "@/@types/font";

export const NRDrawer = ({
  OpenBtn,
  children,
  closeIcon,
  ...rest
}: ADrawerProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { fontName } = useFont();
  return (
    <BaseADrawer
      theme={theme}
      font={fontName as WebsiteFontsKey}
      OpenBtn={OpenBtn}
      closeIcon={closeIcon}
      {...rest}
    >
      {children}
    </BaseADrawer>
  );
};
