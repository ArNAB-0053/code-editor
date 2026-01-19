import { themeConfig } from "@/config/themeConfig";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Tooltip, TooltipProps } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";

// const StyledTooltip = styled(Tooltip)`
//     .ant-tooltip, .ant-tooltip-inner {
//         min-height: 0px !important;
//         padding: 0px !important;
//     }
// `

type ATooltipProps = Omit<TooltipProps, "align"> & {
  offset?: [number, number];
  titleIsString?: boolean;
};

const ATooltip = ({
  children,
  title,
  placement = "bottom",
  offset = [0, 5],
  className,
  titleIsString = true,
  color,
  rootClassName,
  ...rest
}: ATooltipProps) => {
  const websiteTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(websiteTheme);
  return (
    <Tooltip
      align={{
        offset: offset,
      }}
      placement={placement}
      rootClassName={cn("rounded-md! overflow-hidden!", rootClassName)}
      title={
        titleIsString ? (
          <p
            style={{ color: theme.textColor }}
            className={cn(
              spaceGrotesk.className,
              className,
              "text-center text-xs leading-5 py-1 px-2"
            )}
          >
            {title as string}
          </p>
        ) : (
          title
        )
      }
      color={color ? color : `${theme.activeColor}40`}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default ATooltip;
