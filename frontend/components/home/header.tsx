"use client";
import { useCookieItems } from "@/hooks/useItemFromCookie";
import React from "react";
import Logo from "../Logo";
import { ThemeChange } from "../theme-change";

const Header = () => {
  const { theme } = useCookieItems();
  return (
    <div
      className="border-2 w-[50vw] h-[70px] place-self-center rounded-full px-4 mt-5 flex items-center justify-between"
      style={{
        borderColor: theme.border20,
      }}
    >
      <Logo />
      <div className="space-x-4">
        <ThemeChange/>
      </div>
    </div>
  );
};

export default Header;
