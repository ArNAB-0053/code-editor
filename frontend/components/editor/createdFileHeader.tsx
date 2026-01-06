import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "./header-buttons";
import { useRunCode } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import {
  selectedCreatedFileCode,
  selectedCreatedFileLang,
  selectedCreatedFileName,
  selectedfileId,
  setCreatedFileOutputRedux,
} from "@/redux/slices/createdFilesEditorSlice";
import { langs } from "@/constants/lang";
import { useUpdateFilesCodeOutput } from "@/services/files";
import { selectedUserId } from "@/redux/slices/userSlice";

const CreatedFileEditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const currentCode = useSelector(selectedCreatedFileCode);
  const fileName = useSelector(selectedCreatedFileName);
  const lang = useSelector(selectedCreatedFileLang);

  const ext = langs[lang]?.ext;

  // console.log("Curr Code", currentCode);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateFilesCodeOutput();

  const fileId = useSelector(selectedfileId);
  const lastOpt = useRef("");

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
      const payload = { FileId: fileId, Output: output, OwnerId: userId };

      if (lastOpt.current !== output) {
        updateOutput(payload, {
          onSuccess: (res) => {
            lastOpt.current = output;
            dispatch(setCreatedFileOutputRedux(output));
          },
        });
      }
    } catch (err: any) {
      props.setError(err.message ?? String(err));
    } finally {
      props.setLoading(false);
    }
  };

  function clearOutput() {
    props.setError("");
    dispatch(setCreatedFileOutputRedux(""));
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
        {fileName}
        {ext}
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

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={handleRunCode} loading={props.loading} />
      </div>
    </div>
  );
};

export default CreatedFileEditorHeaderComponent;
