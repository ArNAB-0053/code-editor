"use client";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { themeConfig } from "@/config/themeConfig";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

interface CInfoModalProps {
  setShowModal: SetterFunctionTypesBool;
  Icon: ReactElement;
  title: ReactElement | string;
  description: ReactElement | string;
  buttonText?: string | ReactElement;
}

const CInfoModal = ({
  Icon,
  title,
  description,
  buttonText = "I Understand",
  setShowModal,
}: CInfoModalProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <>
      {/* BackDrop */}
      <div
        className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        // onClick={() => setShowModal(false)}
      />

      {/* Main Modal */}
      <div
        className={cn(
          "fixed z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[90vw] max-w-sm",
          "rounded-xl border border-white/10",
          "backdrop-blur-xl",
          "p-4 shadow-2xl",
          "flex flex-col items-center gap-2"
        )}
        style={{
          backgroundColor: theme.border10,
        }}
      >
        {Icon}
        {title}
        {description}

        {/* Action */}
        <button
          onClick={() => setShowModal(false)}
          className={cn(
            spaceGrotesk.className,
            "mt-2 rounded-md px-4 py-1.5 text-sm font-medium cursor-pointer bg-white/10 hover:bg-white/20 transition"
          )}
        >
          {buttonText}
        </button>
      </div>
    </>
  );
};

export default CInfoModal;
