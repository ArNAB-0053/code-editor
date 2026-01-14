import { IBaseLogoProps } from "@/@types/_base";
import { cn } from "@/lib/utils";

export const LangIcon = ({ size = 24, style, className }: IBaseLogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("icon icon-tabler icons-tabler-outline icon-tabler-text-grammar", className)}
      style={style}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 9a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M4 12v-5a3 3 0 1 1 6 0v5" />
      <path d="M4 9h6" />
      <path d="M20 6v6" />
      <path d="M4 16h17" />
      <path d="M4 20h6" />
      <path d="M16 19l-2 2l2 2" />
      <path d="M20 23l2 -2l-2 -2" />
    </svg>
  );
};
