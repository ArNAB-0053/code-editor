import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "../header-buttons";
import { useRunCode } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
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
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IFileRenameRequest } from "@/@types/files";
import { useRename } from "@/hooks/useRenameFileFolder";
import { setEditorLayout } from "@/redux/slices/editorLayout";

const CreatedFileEditorHeaderComponent = (props: HeaderProps) => {
  const [isRenaming, setIsRenaming] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const currentCode = useSelector(selectedCreatedFileCode);
  const fileName = useSelector(selectedCreatedFileName);

  const lang = useSelector(selectedCreatedFileLang);

  const ext = langs[lang]?.ext;

  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    setInputValue(fileName);
  }, [fileName]);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateFilesCodeOutput();

  const { rename } = useRename();

  // for editor
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
      <span className="font-medium text-center flex items-center justify-between pl-8 pr-6 gap-x-2 w-[260px] ">
        {isRenaming ? (
          <div
            className="flex items-center justify-between w-full border px-2 py-0.5"
            style={{
              borderColor: theme.border,
            }}
          >
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="outline-none border-0! flex-1 "
              style={{
                width: "calc(100% - 24px)",
                color: theme.textColor,
              }}
            />
            <p className="pr-1">{ext}</p>
          </div>
        ) : (
          <p
            style={{
              color: theme.textColor,
            }}
          >
            {fileName}
            {ext}
          </p>
        )}

        {isRenaming ? (
          <button
            className="w-6 px-1.5 py-1 rounded-md cursor-pointer hover:opacity-100 opacity-80 transition-all duration-200 ease-linear "
            style={{
              backgroundColor: theme.border20,
            }}
            onClick={() => {
              const payload: IFileRenameRequest = {
                FileId: fileId,
                OwnerId: userId,
                FileName: inputValue,
              };
              rename(payload);
              setIsRenaming(false);
            }}
          >
            <FaCheck size={13} className="opacity-90" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsRenaming(true);
            }}
            className="p-1  opacity-80 hover:opacity-100 transition-all duration-200 ease-linear cursor-pointer rounded-md"
            style={{
              backgroundColor: theme.border15,
            }}
          >
            <MdDriveFileRenameOutline />
          </button>
        )}
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

        <button onClick={() => dispatch(setEditorLayout("horizontal"))}>
          A
        </button>
        <button onClick={() => dispatch(setEditorLayout("vertical"))}>
          B
        </button>

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton onClick={handleRunCode} loading={props.loading} />
      </div>
    </div>
  );
};

export default CreatedFileEditorHeaderComponent;
