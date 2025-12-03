import { IBaseStylingProps, IExtraProps } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";

export interface AvatarProps extends IBaseStylingProps, IExtraProps {
  variant?: "transparent" | "default" | "noBorder" | "none";
  name: string;
}

const BaseCAvatar = ({
  name,
  font,
  theme,
  className,
  style,
  variant = "default",
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "border-2 rounded-full flex items-center justify-center w-9 h-9 text-xl font-semibold",
        websiteFonts[font as WebsiteFontsKey].className,
        className
      )}
      style={{
        borderColor:
          variant === "noBorder" || "none" ? "transparent" : theme.border20,
        background:
          variant === "transparent" || "none"
            ? "transparent"
            : `${theme.activeColor}30`,
        color: `${theme.activeColor}`,
        ...style,
      }}
    >
      {name?.charAt(0).toUpperCase()}
    </div>
  );
};

export default BaseCAvatar;
