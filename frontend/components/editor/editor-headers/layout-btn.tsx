import { ThemeTypes } from "@/@types/theme";
import { LayoutHorizontalIcon, LayoutVerticalIcon } from "@/assets/LayoutIcons";
import ATooltip from "@/components/ui/antd/tooltip";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  selectEditorLayout,
  setEditorLayout,
} from "@/redux/slices/editorLayout";
import { transitionString } from "@/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const LayoutButton = ({ theme, dividerColor }: { theme: ThemeTypes; dividerColor?: string }) => {
  const dispatch = useDispatch();
  const layout = useSelector(selectEditorLayout);
  return (
    <>
      <div
        className="flex items-center justify-center rounded-md overflow-hidden opacity-90 "
        style={{
          backgroundColor: `${theme.activeColor}80`,
          color: theme.textColor,
        }}
      >
        <ATooltip
          titleIsString={false}
          title={
            <div className="text-xs py-2 px-2">
              <p
                style={{ color: theme.textColor }}
                className={cn(spaceGrotesk.className, "text-center leading-5")}
              >
                Horizontal Layout
              </p>

              <div
                className="flex items-center justify-evenly h-10 text-[10px] rounded-md mt-1 opacity-80 "
                style={{
                  backgroundColor: `${theme.activeColor}30`,
                  color: theme.activeColor,
                }}
              >
                <div className="p-1">Code</div>
                <div
                  className="h-full w-px opacity-80 "
                  style={{
                    backgroundColor: `${theme.activeColor}`,
                  }}
                />
                <div className="p-1">Output</div>
              </div>
            </div>
          }
        >
          <button
            className={cn(
              "w-full h-full px-1.5 py-1 cursor-pointer group rounded-md relative overflow-hidden ",
              transitionString
            )}
            onClick={() => dispatch(setEditorLayout("horizontal"))}
            style={{
              color: theme.textColor,
            }}
          >
            <LayoutHorizontalIcon />

            <div
              className={cn(
                "absolute left-0 top-0 w-full h-full -z-10 ",
                layout === "horizontal"
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-40",
                transitionString
              )}
              style={{ background: theme.activeColor }}
            />
          </button>
        </ATooltip>

        <ATooltip
          titleIsString={false}
          title={
            <div className="text-xs py-2 px-2">
              <p
                style={{ color: theme.textColor }}
                className={cn(spaceGrotesk.className, "text-center leading-5")}
              >
                Vertical Layout
              </p>

              <div
                className="flex flex-col items-center justify-center text-[10px] rounded-md mt-1 opacity-80 "
                style={{
                  backgroundColor: `${theme.activeColor}30`,
                  color: theme.activeColor,
                }}
              >
                <div className="p-1 h-9 flex items-center justify-center">
                  Code
                </div>
                <div
                  className="w-full h-px opacity-80 "
                  style={{
                    backgroundColor: `${theme.activeColor}`,
                  }}
                />
                <div className="p-1 h-7 flex items-center justify-center">
                  Output
                </div>
              </div>
            </div>
          }
        >
          <button
            className={cn(
              "w-full h-full px-1.5 py-1 cursor-pointer group rounded-md relative overflow-hidden ",
              transitionString
            )}
            onClick={() => dispatch(setEditorLayout("vertical"))}
            style={{
              color: theme.textColor,
            }}
          >
            <LayoutVerticalIcon />

            <div
              className={cn(
                "absolute left-0 top-0 w-full h-full -z-10 opacity-0",
                layout === "vertical"
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-40",
                transitionString
              )}
              style={{ background: theme.activeColor }}
            />
          </button>
        </ATooltip>
      </div>

      <div
        className="w-0.5 h-6 "
        style={{ backgroundColor: dividerColor ? dividerColor : theme.border }}
      />
    </>
  );
};

export default LayoutButton;
