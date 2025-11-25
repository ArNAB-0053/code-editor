"use client";
import { useCookieFont, useCookieItems } from "@/hooks/useItemFromCookie";
import Logo from "../Logo";
import ThemePalette from "../theme/theme-palette";

const Header = () => {
  const { theme } = useCookieItems();
  const { font } = useCookieFont();
  return (
    <div
      className="border-2 w-[50vw] h-[70px] place-self-center rounded-full px-4 mt-5 flex items-center justify-between"
      style={{
        borderColor: theme.border20,
      }}
    >
      <Logo />
      <ThemePalette/>
    </div>
  );
};

export default Header;
