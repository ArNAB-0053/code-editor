import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";
import { ADrawerProps, BaseADrawer } from "../_Base";
import NRCButton from "./button";
import { RxCross2 } from "react-icons/rx";

export const NRDrawer = ({
  OpenBtn,
  children,
  closeIcon,
  ...rest
}: ADrawerProps) => {
  const { theme } = useCookieTheme();
  const { font } = useCookieFont();
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
