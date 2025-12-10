import { IBaseStylingProps, IExtraProps, NameObjType } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";

export interface AvatarProps extends IBaseStylingProps, IExtraProps {
  variant?: "transparent" | "default" | "noBorder" | "none";
  name: NameObjType;
  characters?: number;
}

const BaseCAvatar = ({
  name,
  font,
  theme,
  className,
  style,
  variant = "default",
  characters = 2,
}: AvatarProps) => {
  const extractInitials = (nameValue: NameObjType) => {
    if (
      typeof nameValue === "object" &&
      nameValue !== null &&
      !Array.isArray(nameValue)
    ) {
      const fn = nameValue?.firstName?? " ";
      const mn = nameValue?.middleName?? " ";
      const ln = nameValue?.lastName?? " ";

      if (characters === 3 && mn) return fn[0] + mn[0] + ln[0];
      else if (characters === 3 && !mn || characters === 2) return fn[0] + ln[0];
      else if (characters === 1) return fn[0];
    }

    return "";
  };

  const initials = extractInitials(name);

  return (
    <div
      className={cn(
        "border-2 rounded-full flex items-center justify-center w-9 h-9 text-xl font-semibold uppercase",
        websiteFonts[font as WebsiteFontsKey]?.className,
        className
      )}
      style={{
        borderColor:
          variant === "noBorder" || variant === "none"
            ? "transparent"
            : theme.border20,
        background:
          variant === "transparent" || variant === "none"
            ? "transparent"
            : `${theme.activeColor}30`,
        color: `${theme.activeColor}`,
        ...style,
      }}
    >
      {initials}
    </div>
  );
};

export default BaseCAvatar;
