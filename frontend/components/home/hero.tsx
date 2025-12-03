"use client";

import { RxArrowRight } from "react-icons/rx";
import { NRCButton } from "../ui/no-redux";
import {
  jetBrainsMono,
  prompt,
  spaceGrotesk,
} from "@/fonts";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import Link from "next/link";
import { RotatingLanguageHero } from "./RotatingLanguageHero";
import { Tooltip } from "antd";
import { appUrls } from "@/config/navigation.config";

const Hero = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { font } = useFont();
  // if (document) console.log(document?.documentElement.dataset);

  return (
    <section
      className={`${font?.className} pt-[20vh] lg:pt-48 xl:pt-60 min-h-svh  flex flex-col items-center text-center`}
      style={{
        // background: theme?.editorBackground,
        color: theme?.textColor,
      }}
    >
      <div
        className="px-6 py-3 rounded-full text-xs font-medium mb-6"
        style={{
          background: `${theme?.activeColor}50`,
          color: theme?.activeColor,
        }}
      >
        The Ultimate Online Code Editor
      </div>

      <h1
        className={`text-4xl md:text-5xl xl:text-[80px] leading-[1.7rem] md:leading-[2.2rem] xl:leading-19 tracking-tight font-medium ${spaceGrotesk.className}`}
      >
        {/* <span
          className={`text-4xl md:text-5xl xl:text-6xl ${prompt.className} `}
        >
          Write, Run & Share Code
        </span> */}
        {/* <span
          className={`text-4xl md:text-5xl xl:text-6xl ${prompt.className} `}
        >
          Write & Run Code
        </span> */}
        <div
          className={`text-4xl md:text-5xl xl:text-[62px] ${prompt.className} `}
        >
          Write, Run &
          <Tooltip
            align={{
              offset: [0, 5],
            }}
            placement="top"
            title={
              <p
                style={{ color: theme.textColor }}
                className={`${spaceGrotesk.className} text-center text-base leading-5 py-2`}
              >
                For share you need to create an account
              </p>
            }
            color={`${theme.activeColor}40`}
            // style={{
            //   filter: 'back'
            // }}
            className="backdrop-blur-2xl!"
          >
            <span
              className={`font-normal mx-5 opacity-90 group relative cursor-pointer ${jetBrainsMono.className}`}
              style={{ color: theme.activeColor }}
            >
              Share
              <span
                className="h-[3px] md:h-1 xl:h-[5px] w-28 md:w-[9.2rem] xl:w-48 absolute bottom-5 md:bottom-7 lg:bottom-6 xl:bottom-9 backdrop-blur-2xl -left-1 -rotate-2"
                style={{
                  background: theme.activeColor,
                }}
              />
              <span
                className="absolute h-8 w-28 md:h-12 md:w-36 lg:h-12 lg:w-36 xl:h-16 xl:w-48 -z-1 rounded-xl -left-1 top-2 group-hover:opacity-100 opacity-0 transition-all duration-150 ease-linear"
                style={{
                  background: `${theme.activeColor}40`,
                }}
              />
            </span>
          </Tooltip>
          Code
        </div>
        <strong>Instantly</strong>
        <strong className="mx-6">—</strong>
        <span style={{ color: theme?.activeColor }}>Without Any Setup</span>
      </h1>

      {/* <div className="my-10 text-xl flex items-center justify-center gap-x-3">
        Run
        <div className="bg-white text-green-500 rounded-full p-2.5">
          <FaPlay size={18} className="translate-x-px rotate-5" />
        </div>
        <span className={`${play_us_modern.className} text-sm `}>
          Python
        </span>
      </div> */}

      <RotatingLanguageHero activeColor={theme.activeColor} />

      <p
        className={`text-xs md:text-sm sm:text-xs opacity-70 max-w-lg ${jetBrainsMono.className}`}
      >
        A lightweight, blazing-fast editor built for developers. Supports
        multiple languages, custom themes, and real-time previews.
      </p>

      <div className="flex items-center max-sm:flex-col gap-4 mt-10">
        {/* GUEST */}
        <Link href={appUrls.PYTHON} className="rounded-xl">
          <NRCButton
            // type="primary"
            // variant="default"
            hoverBgColor={`${theme?.activeColor}d9`}
            className="flex items-center gap-2 text-white!"
            // onClick={() => alert("Guest Mode Activated")}
          >
            Continue as Guest
            <RxArrowRight size={18} />
          </NRCButton>
        </Link>

        <Link href={appUrls.REGISTER} className="rounded-xl">
          <NRCButton
            type="none"
            variant="sameBg"
            hoverColor={theme?.activeColor}
            hoverBgColor={`${theme?.activeColor}20`}
            className="px-4 py-2 text-sm"
            // onClick={() => setOpen(true)}
          >
            Create Account
          </NRCButton>
        </Link>
      </div>

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
            style={{ color: `${theme?.activeColor}` }}
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
