import {
  cascadiaCode,
  jetBrainsMono,
  prompt,
  spaceGrotesk,
  yanone,
} from "@/fonts";
import { useCookieItems } from "@/hooks/useItemFromCookie";
import Link from "next/link";
import React from "react";

const Logo = () => {
  const { theme, font } = useCookieItems();
  return (
    <Link href="/" className="relative translate-y-[3px] flex items-center justify-center gap-x-2">
      <div className="aspect-square bg-white flex items-center justify-center text-black rounded-full -translate-y-1 w-9 h-9 p-1 font-bold">CX</div>
      <span>
        <h1 className={`${yanone.className} text-2xl font-bold tracking-wider`}>
          Codeditor
        </h1>
        <p className={`${jetBrainsMono.className} -translate-y-2 text-xs`}>
          Code anywhere.
        </p>
        <span
          className={`absolute right-1 -top-2 text-[1.8rem] font-bold ${prompt.className}`}
        >
          X
        </span>
      </span>
    </Link>
  );
};

export default Logo;
