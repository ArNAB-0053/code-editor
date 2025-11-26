"use client";
import Logo from "../Logo";
import ThemePalette from "../theme/theme-palette";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <div
      className="border-2 w-9/10 lg:w-[50vw] h-[70px] z-10 backdrop-blur-sm place-self-center rounded-full px-4 mt-5 flex items-center justify-between fixed top-5"
      style={{
        borderColor: theme.border20,
      }}
    >
      <Logo />
      <ThemePalette />
    </div>
  );
};

export default Header;
