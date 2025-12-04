import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "./header-buttons";
import { useRunCode, useUpdateOutput } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import {
  selectedCode,
  selectedEditorId,
  setCodeRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { IoMdCloudDone, IoMdShare } from "react-icons/io";
import { AButton } from "../ui/antd";
import { FaShare } from "react-icons/fa";
import { cn } from "@/lib/utils";

const EditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();

  const currentCode = useSelector(selectedCode);

  // console.log("Curr Code", currentCode);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateOutput();

  const editorId = useSelector(selectedEditorId);
  const lastOpt = useRef("");

  // console.log(editorId)

  // Ouput Header
  if (props.isOutput) {
    return (
      <div
        className="flex items-center justify-between gap-8 text-xs bg-[#43434354] border-b  px-2 py-1.5 h-[50px]"
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
      // console.log(res);
      const output = res.output ?? "";
      if (lastOpt.current !== output) {
        updateOutput(
          { editorId, output },
          {
            onSuccess: (res) => {
              // console.log("Updated", res);
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

        <AButton
          onClick={() => props.setOpen(true)}
          className={cn(props.isShared && "hidden! opacity-0!", "aspect-square! p-0!")}
        >
          <IoMdShare size={18} />
        </AButton>

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={handleRunCode} loading={props.loading} />
      </div>
    </div>
  );
};

export default EditorHeaderComponent;
