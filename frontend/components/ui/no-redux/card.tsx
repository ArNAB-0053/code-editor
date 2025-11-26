"use client";
import { useFont } from "@/context/FontProvider";
import BaseACard, { IACardProps } from "../_Base/ACard";
import { useTheme } from "@/context/ThemeContext";
import { themeConfig } from "@/config/themeConfig";

const NRACard = ({
  title,
  style,
  className,
  children,
  ...rest
}: IACardProps) => {
  const { font } = useFont();
    const { themeName } = useTheme();
    const theme = themeConfig(themeName);
  return (
    <BaseACard theme={theme} font={font} title={title} style={style} className={className} {...rest}>
      {children}
    </BaseACard>
  );
};

export default NRACard;
