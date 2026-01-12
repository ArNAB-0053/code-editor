import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "../header-buttons";
import { useRunCode, useUpdateOutput } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import {
  selectedCode,
  selectedEditorId,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { cn } from "@/lib/utils";
import { AButton } from "@/components/ui/antd";
import ShareModal from "@/components/modals/share";
import { transitionString } from "@/styles";
import { LayoutHorizontalIcon, LayoutVerticalIcon } from "@/assets/LayoutIcons";
import { spaceGrotesk } from "@/fonts";
import ATooltip from "@/components/ui/antd/tooltip";
import { selectEditorLayout, setEditorLayout } from "@/redux/slices/editorLayout";

const EditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const currentCode = useSelector(selectedCode);
  const layout = useSelector(selectEditorLayout);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateOutput();

  const editorId = useSelector(selectedEditorId);
  const lastOpt = useRef("");

  // Ouput Header
  if (props.isOutput) {
    return (
      <div
        className="flex items-center justify-between xl:gap-8 text-xs bg-[#43434354] border-b  px-2 py-1.5 h-[50px]"
        style={{
          borderBottomColor: `${theme?.border10}`,
        }}
      >
        <span className="text-base font-semibold tracking-[1.2px] ">
          Output
        </span>
        <TransparentButton onClick={clearOutput} loading={props.loading} />
      </div>
    );
  }

  const handleRunCode = async () => {
    props.setLoading(true);
    props.setError("");

    try {
      const res = await runCode({
        code: currentCode,
        lang: props.p_lang,
      });
      const output = res.output ?? "";
      if (lastOpt.current !== output) {
        updateOutput(
          { editorId, output },
          {
            onSuccess: (res) => {
              lastOpt.current = output;
              dispatch(setOutputRedux(output));
            },
          }
        );
      }
    } catch (err: any) {
      props.setError(err.message ?? String(err));
    } finally {
      props.setLoading(false);
    }
  };

  function clearOutput() {
    props.setError("");
    dispatch(setOutputRedux(""));
  }

  const copyCode = () => {
    navigator.clipboard.writeText(currentCode).then(() => {
      props.setIsCopied(true);
    });
  };

  return (
    // Editor Header
    <div className="flex items-center justify-between text-base h-[50px] relative w-full">
      <span className="font-medium text-center flex items-center justify-center gap-x-2 w-[100px]">
        main.py
        {/* <IoMdCloudDone className="opacity-40 size-3.5" /> */}
      </span>

      <div
        className="flex-1/2 flex items-center justify-end gap-2 px-2 py-1.5 h-full rounded-bl-xl border-b border-l "
        style={{
          background: theme.headerColor,
          borderBottomColor: theme?.border10,
          borderLeft: theme?.border10,
        }}
      >
        {/* <TransparentButton
          onClick={() => {
            dispatch(setCodeRedux(""));
          }}
        /> */}

        <div
          className="flex items-center justify-center rounded-md opacity-90 "
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
                  className={cn(
                    spaceGrotesk.className,
                    "text-center leading-5"
                  )}
                >
                  Horizontal Layout
                </p>

                <div
                  className="flex items-center justify-evenly h-10 text-[10px] rounded-md mt-1 opacity-80 "
                  style={{
                    backgroundColor: `${theme.activeColor}30`,
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
                  className={cn(
                    spaceGrotesk.className,
                    "text-center leading-5"
                  )}
                >
                  Vertical Layout
                </p>

                <div
                  className="flex flex-col items-center justify-center text-[10px] rounded-md mt-1 opacity-80 "
                  style={{
                    backgroundColor: `${theme.activeColor}30`,
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

        <AButton
          onClick={() => setOpen(true)}
          className={cn(
            props.isShared && "hidden! opacity-0!",
            "aspect-square! p-0!"
          )}
        >
          <IoMdShare size={18} />
        </AButton>

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={handleRunCode} loading={props.loading} />
      </div>

      {!props.isShared && (
        <ShareModal theme={theme} setOpen={setOpen} open={open} />
      )}
    </div>
  );
};

export default EditorHeaderComponent;
