"use client";
import BaseACard, { IACardProps } from "../_Base/ACard";
import { useCookieItems } from "@/hooks/useItemFromCookie";

const NRACard = ({
  title,
  style,
  className,
  children,
  ...rest
}: IACardProps) => {
  const { theme, font } = useCookieItems();
  return (
    <BaseACard theme={theme} font={font} title={title} style={style} className={className} {...rest}>
      {children}
    </BaseACard>
  );
};

export default NRACard;
