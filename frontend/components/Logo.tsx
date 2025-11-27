import {
  play_cu,
} from "@/fonts";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="relative translate-y-[3px] flex items-center justify-center gap-x-2 select-none"
    >
      <h1
        className={`${play_cu.className} text-[23px] font-bold `}
      >
        Coditor
      </h1>

      <div className="bg-white h-1.5 w-1.5 aspect-square rounded-full translate-y-2 -translate-x-2" />
      {/* <span className={`-translate-x-3 translate-y-0.5 ${cascadia.className} bg-white/30 font-semibold py-1 px-2 rounded-md text-xs`}>x</span> */}
    </Link>
  );
};

export default Logo;
