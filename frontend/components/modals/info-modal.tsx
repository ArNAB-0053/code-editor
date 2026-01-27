"use client";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { themeConfig } from "@/config/themeConfig";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { ReactElement, ReactNode } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { NextFont } from "next/dist/compiled/@next/font";

interface CInfoModalProps {
  showModal?: boolean;
  setShowModal: SetterFunctionTypesBool;
  Icon?: ReactElement;
  title: ReactElement | string;
  description: ReactElement | string;
  showCancel?: boolean;
  buttonText?: string | ReactElement;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  others?: ReactNode;
  onClick?: () => void;
  closeOnClickOutside?: boolean;
  font?: NextFont;
}

const CInfoModal = ({
  showModal,
  Icon,
  title,
  description,
  showCancel,
  buttonText = "I Understand",
  buttonClassName,
  buttonStyle,
  setShowModal,
  others,
  onClick,
  closeOnClickOutside,
  font,
}: CInfoModalProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* BackDrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            onClick={() => (closeOnClickOutside ? setShowModal(false) : {})}
          />

          {/* Main Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className={cn(
              "fixed z-[999999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[90vw] max-w-sm",
              "rounded-xl border border-white/10",
              "backdrop-blur-xl",
              "p-4 shadow-2xl",
              "flex flex-col items-center gap-2",
            )}
            style={{
              backgroundColor: theme.border10,
            }}
          >
            {Icon}
            {title}
            {description}

            {/* Action */}
            <div className="flex items-center gap-x-5">
              {showCancel && (
                <div
                  onClick={() => setShowModal(false)}
                  className={cn(
                    font ?? spaceGrotesk.className,
                    "mt-2 rounded-md px-4 py-1.5 text-sm font-medium cursor-pointer bg-white/10 hover:bg-white/20 transition",
                  )}
                >
                  Cancel
                </div>
              )}

              <div
                onClick={() => (onClick ? onClick() : setShowModal(false))}
                className={cn(
                  font ?? spaceGrotesk.className,
                  "mt-2 rounded-md px-4 py-1.5 text-sm font-medium cursor-pointer bg-white/10 hover:bg-white/20 transition",
                  buttonClassName,
                )}
                style={buttonStyle}
              >
                {buttonText}
              </div>
            </div>

            {others}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CInfoModal;
