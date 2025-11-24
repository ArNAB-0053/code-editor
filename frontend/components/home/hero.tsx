"use client";

import { useState } from "react";
import { useCookieFont, useCookieTheme } from "@/hooks/useItemFromCookie";
import { RxArrowRight } from "react-icons/rx";
import { NRCButton } from "../ui/no-redux";
import {
  inconsolata,
  inter,
  jetBrainsMono,
  lexend,
  open_sans,
  outfit,
  poppins,
  prompt,
} from "@/fonts";

const Hero = () => {
  const [open, setOpen] = useState(false);

  const { theme } = useCookieTheme();
  const { font } = useCookieFont();

  return (
    <section
      className={`${font.className} min-h-[80vh] w-full flex flex-col items-center justify-center px-6 text-center`}
      style={{
        // background: theme.editorBackground,
        color: theme.outputColor,
      }}
    >
      {/* TOP BADGE */}
      <div
        className="px-6 py-3 rounded-full text-xs font-medium mb-6"
        style={{
          background: `${theme.activeColor}50`,
          color: theme.activeColor,
        }}
      >
        The Ultimate Online Code Editor
      </div>

      {/* MAIN HEADING */}
      <h1
        className={`text-4xl md:text-5xl sm:text-6xl font-bold max-w-3xl leading-[53px] ${prompt.className}`}
      >
        <span className={`text-4xl md:text-5xl sm:text-6xl ${prompt.className} `}>
          Write, Run & Share Code
        </span>
        <br />
        Instantly —
        <span style={{ color: theme.activeColor }}>Without Any Setup</span>
      </h1>

      {/* SUBTEXT */}
      <p
        className={`text-sm md:text-sm sm:text-base opacity-70 mt-4 max-w-lg ${jetBrainsMono.className}`}
      >
        A lightweight, blazing-fast editor built for developers. Supports
        multiple languages, custom themes, and real-time previews.
      </p>

      {/* CTA BUTTONS */}
      <div className="flex items-center gap-4 mt-10">
        {/* GUEST */}
        <NRCButton
          // type="primary"
          // variant="default"
          hoverBgColor={`${theme.activeColor}d9`}
          className="flex items-center gap-2 text-white!"
          onClick={() => alert("Guest Mode Activated")}
        >
          Continue as Guest
          <RxArrowRight size={18} />
        </NRCButton>

        {/* CREATE ACCOUNT */}
        <NRCButton
          type="none"
          variant="sameBg"
          hoverColor={theme.activeColor}
          hoverBgColor={`${theme.activeColor}20`}
          className="px-4 py-2 text-sm"
          onClick={() => setOpen(true)}
        >
          Create Account
        </NRCButton>
      </div>

      {/* FOOT NOTE */}
      <div className="text-xs mt-6">
        <p className=" opacity-40 ">
          No signup required. Fully browser-based. Your preferences are saved
          automatically.
        </p>
        <>
          <span className=" opacity-40 mr-1">
            But if you want extra features, you can sign in and unlock more
            benefits
          </span>
          👉
          <a
            href="#compare"
            style={{ color: `${theme.activeColor}` }}
            className="ml-1 underline opacity-80 hover:opacity-100"
          >
            See what you get
          </a>
        </>
      </div>
    </section>
  );
};

export default Hero;
