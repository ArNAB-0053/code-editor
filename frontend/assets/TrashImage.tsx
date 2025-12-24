import { IBaseLogoProps } from "@/@types/_base";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const TrashImage = ({
  size = 512,
  style,
  className,
}: IBaseLogoProps) => {
  return (
    <Image
      src="/delete.png"
      width={size}
      height={size}
      alt="Delete"
      style={style}
      className={cn("invert opacity-20 grayscale-100 brightness-50 select-none ", className)}
      draggable={false}
    />
  );
};
