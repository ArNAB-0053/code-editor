"use client";
import Logo from "../Logo";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { FontPalette, ThemePalette } from "../palette";
import NRCDivider from "../ui/no-redux/divider";

const Header = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <div
      className=" w-full lg:w-[75vw] xl:lg:w-[65vw] h-[70px] z-10 backdrop-blur-sm place-self-center rounded-full px-6  flex items-center justify-between fixed top-5 max-md:top-0"
    >
      <Logo />
      <div className="flex items-center ">
        <FontPalette />
        <NRCDivider direction="horizontal" className="bg-white! h-4! mx-2!" />
        <ThemePalette />
      </div>
    </div>
  );
};

export default Header;
