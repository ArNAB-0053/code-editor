import { FullLogo, HalfLogo } from "@/assets/Logo";
import { appUrls } from "@/config/navigation.config";
import { play_cu } from "@/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  className,
  textColor,
  dotColor,
}: {
  className?: string;
  textColor?: string;
  dotColor?: string;
}) => {
  return (
    <Link
      href={appUrls.HOME}
      className={cn(
        "relative translate-y-[3px] flex items-center justify-center gap-x-2 select-none",
        className,
      )}
    >
      <HalfLogo size={40} />
      <div className="flex items-center gap-x-2 -translate-x-3">
        <h1
          className={`${play_cu.className} text-[23px] font-bold `}
          style={{
            color: textColor ? textColor : "#fff",
          }}
        >
          Coditor
        </h1>

        <div
          className=" h-1.5 w-1.5 aspect-square rounded-full translate-y-2 -translate-x-2"
          style={{
            backgroundColor: dotColor ? dotColor : "#fff",
          }}
        />
      </div>
      {/* <span className={`-translate-x-3 translate-y-0.5 ${cascadia.className} bg-white/30 font-semibold py-1 px-2 rounded-md text-xs`}>x</span> */}
    </Link>
  );
};

export default Logo;
