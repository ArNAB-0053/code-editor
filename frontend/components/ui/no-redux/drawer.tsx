import { ADrawerProps, BaseADrawer } from "../_Base";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";

export const NRDrawer = ({
  OpenBtn,
  children,
  closeIcon,
  ...rest
}: ADrawerProps) => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { font } = useFont();
  return (
    <BaseADrawer
      theme={theme}
      font={font}
      OpenBtn={OpenBtn}
      closeIcon={closeIcon}
      {...rest}
    >
      {children}
    </BaseADrawer>
  );
};
