import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";
import { play_us_modern, spaceGrotesk } from "@/fonts";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const LeftSide = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  const { font } = useFont();
  return (
    <div
      className={`h-svh max-md:hidden overflow-hidden relative  py-16 px-8 xl:px-16 flex flex-col ${font?.className}`}
      style={{
        background: theme.editorBackground,
      }}
    >
      <Link
        href="/"
        className="text-xs mb-8 w-fit hover:opacity-90 transition-all duration-100 ease-linear"
      >
        <span
          className="flex items-center justify-start gap-2 font-semibold"
          style={{
            color: theme.activeColor,
          }}
        >
          <FaArrowLeftLong />
          Back Home
        </span>
        <div
          className="h-px mt-1 w-full"
          style={{
            background: theme.activeColor,
          }}
        />
      </Link>

      <h3
        className={`${play_us_modern?.className} text-4xl lg:text-5xl xl:text-5xl font-semibold`}
      >
        <span
          className="pr-2 "
          style={{
            color: theme.activeColor,
          }}
        >
          Join
        </span>
        <span
          className={`${spaceGrotesk.className} font-medium -tracking-[0.2rem] text-wrap `}
        >
          Us & Unlock Endless
        </span>
        <span
          className="relative px-3 "
          style={{
            color: theme.activeColor,
          }}
        >
          Possibilities!
        </span>
        {/* <span className="relative px-3 text-[2rem] lg:text-[2.5rem]">
            Possibilities !
            <div className="bg-white/20 h-[3.2rem] w-[15.2rem] absolute left-2  bottom-[0.65rem] rounded-xl "/>
          </span> */}
      </h3>

      <p className="mt-12 border-l-2 pl-5 opacity-80 leading-4 text-sm">
        Build, test, and run your ideas instantly. Join a growing community of
        developers exploring code without limits.
      </p>

      {/* <Image
        src="/editor.png"
        height={800}
        width={800}
        alt="Editor Image"
        className="w-fit mt-10 border-2"
      /> */}

      <div
        className=" absolute -left-[20%] -bottom-[30%] w-full aspect-square -z-10 blur-3xl rounded-full"
        style={{
          backgroundColor: theme.activeColor,
        }}
      />
    </div>
  );
};

export default LeftSide;