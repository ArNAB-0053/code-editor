import { themeConfig } from "@/config/themeConfig";
import { useFont } from "@/context/FontProvider";
import { useTheme } from "@/context/ThemeContext";

export const ThemeColorPaletteHeader = () => {
  const { themeName } = useTheme();
  const { font } = useFont();
  return (
    <div className="flex items-center gap-x-3 mb-4">
      <div
        style={{ background: `${themeConfig(themeName).activeColor}70` }}
        className="w-6 h-6 rounded-sm flex items-center justify-center"
      >
        <div
          style={{ background: themeConfig(themeName).activeColor }}
          className="w-3 h-3 rounded-xs "
        />
      </div>

      <h1
        className={`${font?.className}  text-white/80 tracking-wider text-sm`}
      >
        Color Palette
      </h1>
    </div>
  );
};

export const ThemeFontPaletteHeader = () => {
  const { font } = useFont();
  return (
    <div className="flex items-center gap-x-3 mb-4">
      {/* <span className="border-b-2">
        <p className="text-xl -translate-y-1">Aa</p>
      </span> */}

      <h1
        className={`${font?.className}  text-white/80 tracking-wider text-sm`}
      >
        Select a font
      </h1>
    </div>
  );
};

