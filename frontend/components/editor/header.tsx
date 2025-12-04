import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "./header-buttons";
import { useRunCode, useUpdateOutput } from "@/services/code";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import {
  selectedCode,
  selectedEditorId,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { IoMdShare } from "react-icons/io";
import { AButton, AInput, AModal } from "../ui/antd";
import { cn } from "@/lib/utils";
import { useCreateShare } from "@/services/share";
import { selectedUserId } from "@/redux/slices/userSlice";
import { appUrls } from "@/config/navigation.config";
import Link from "next/link";
import { IShareDataModel, IShareModel } from "@/@types/share";

const EditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sharingDetails, setSharingDetails] = useState<IShareDataModel>();
  const [isSharingLoading, setIsSharingLoading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const currentCode = useSelector(selectedCode);

  // console.log("Curr Code", currentCode);

  const theme = themeConfig(props.editorTheme);

  const { mutateAsync: runCode } = useRunCode();
  const { mutateAsync: updateOutput } = useUpdateOutput();
  const { mutateAsync: createShare } = useCreateShare();

  const editorId = useSelector(selectedEditorId);
  const userId = useSelector(selectedUserId);
  const lastOpt = useRef("");

  useEffect(() => {
    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  }, [linkCopied]);

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

  const handleClickShare = async () => {
    setIsSharingLoading(true);
    setOpen(true);
    try {
      const res = await createShare({
        EditorId: editorId,
        SharedByUserId: userId,
        ShareLimit: 5,
        ExpireMinutes: 60,
      });
      console.log("shared", res);
      setSharingDetails(res?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSharingLoading(false);
    }
  };

  const sharedLink = `http://localhost:3000${appUrls.SHARE}/${sharingDetails?.sharedId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(sharedLink).then(() => {
      setLinkCopied(true);
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
          onClick={handleClickShare}
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
        <AModal
          title="Generate Shared Link"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          footer={false}
          className="overflow-hidden"
          loading={isSharingLoading}
        >
          <div className="flex items-center justify-between gap-x-3">
            <AInput value={sharedLink} disabled className="h-8.5! opacity-65!" />
            <CopyButton onClick={copyLink} isCopied={linkCopied} />
          </div>
        </AModal>
      )}
    </div>
  );
};

export default EditorHeaderComponent;
