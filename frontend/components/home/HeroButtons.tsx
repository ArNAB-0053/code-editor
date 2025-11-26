"use client";

import { RxArrowRight } from "react-icons/rx";
import { NRCButton } from "../ui/no-redux";
import { ThemeTypes } from "@/@types/theme";

const HeroButtons = ({ theme }: { theme: ThemeTypes }) => {
  return (
    <div className="flex items-center gap-4 mt-10">
      <NRCButton
        hoverBgColor={`${theme.activeColor}d9`}
        className="flex items-center gap-2 text-white!"
      >
        Continue as Guest
        <RxArrowRight size={18} />
      </NRCButton>

      <NRCButton
        type="none"
        variant="sameBg"
        hoverColor={theme.activeColor}
        hoverBgColor={`${theme.activeColor}20`}
        className="px-4 py-2 text-sm"
      >
        Create Account
      </NRCButton>
    </div>
  );
};

export default HeroButtons;
