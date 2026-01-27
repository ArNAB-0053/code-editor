import { themeConfig } from "@/config/themeConfig";
import { CopyButton, RunButton, TransparentButton } from "../header-buttons";
import { useSelector } from "react-redux";
import { HeaderProps } from "@/@types";
import { useDispatch } from "react-redux";
import {
  selectedSharedCode,
  setShareOutputRedux,
} from "@/redux/slices/sharedEditorSlice";
import { useState } from "react";
import ReadOnlyInfoModal from "@/components/modals/share/readOnlyInfoModal";
import { MakeACopyModal } from "@/components/modals/share/makeACopyModal";
import { CButton } from "@/components/ui/custom";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { FaCopy } from "react-icons/fa";

const SharedEditorHeaderComponent = (props: HeaderProps) => {
  const dispatch = useDispatch();
  const currentCode = useSelector(selectedSharedCode);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);

  const openReadOnlyModal = () => {
    setShowModal(true);
  };

  const theme = themeConfig(props.editorTheme);

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

  function clearOutput() {
    props.setError("");
    dispatch(setShareOutputRedux(""));
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

        <CopyButton onClick={copyCode} isCopied={props.isCopied} />
        <RunButton
          showTooltip={false}
          disabled
          onClick={openReadOnlyModal}
          loading={props.loading}
        />

        <div
          className="w-0.5 h-6 "
          style={{
            backgroundColor: theme.border,
          }}
        />

        <CButton
          onClick={() => setOpen(true)}
          className={cn(
            "text-[13px]! hover:opacity-80! h-9/10 rounded-md! px-4! flex! items-center! justify-center! gap-x-2!",
            transitionString,
          )}
          style={{ backgroundColor: theme.activeColor }}
        >
          <FaCopy />
          Make a Copy
        </CButton>
      </div>

      <MakeACopyModal
        open={open}
        setOpen={setOpen}
        code={props.code ?? ""}
        output={props.output ?? ""}
        lang={props.p_lang}
      />
      <ReadOnlyInfoModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default SharedEditorHeaderComponent;
