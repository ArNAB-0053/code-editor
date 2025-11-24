"use client";
import { useCookieItems } from "@/hooks/useItemFromCookie";
import React from "react";
import Logo from "../Logo";

const Header = () => {
  const { theme, font } = useCookieItems();
  return (
    <div
      className="border-2 w-[50vw] h-[70px] place-self-center rounded-full px-4 mt-5 flex items-center"
      style={{
        borderColor: theme.border20,
      }}
    >
      <Logo />
    </div>
  );
};

export default Header;
