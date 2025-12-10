import GoogleLogo from "@/assets/GoogleLogo";
import { NRCButton } from "@/components/ui/no-redux";
import { themeConfig } from "@/config/themeConfig";
import { useTheme } from "@/context/ThemeContext";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";

export const ContinueWithGoogle = () => {
  const { themeName } = useTheme();
  const theme = themeConfig(themeName);
  return (
    <NRCButton
      type="none"
      variant="transparent"
      className="w-full! flex items-center justify-center gap-x-3 opacity-80 hover:opacity-100"
      hoverBgColor={`${theme.activeColor}40`}
      style={{
        backgroundColor: `${theme.activeColor}30`,
      }}
    >
      <GoogleLogo style={{ width: "18px" }} />
      <span className={cn("font-medium", spaceGrotesk.className)}>
        Continue With Google
      </span>
    </NRCButton>
  );
};
