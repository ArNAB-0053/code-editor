import React from "react";
import CInfoModal from "../info-modal";
import { FaCircleInfo } from "react-icons/fa6";
import { asap } from "@/fonts";
import { cn } from "@/lib/utils";
import { SetterFunctionTypesBool } from "@/@types/_base";

const ReadOnlyInfoModal = ({
  setShowModal,
}: {
  setShowModal: SetterFunctionTypesBool;
}) => {
  return (
    <CInfoModal
      Icon={
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-400">
          <FaCircleInfo size={24} />
        </div>
      }
      title={
        <h2
          className={cn(
            "text-base font-semibold text-center flex items-center gap-x-1"
          )}
        >
          This editor is{" "}
          <p
            className={cn(
              "font-semibold underline underline-offset-4 italic text-[17px] translate-y-px",
              asap.className
            )}
          >
            read-only.
          </p>
        </h2>
      }
      description={
        <p className="text-[12px] text-center leading-tight text-neutral-400 mb-2">
          You can read and copy the code, but editing and running it are
          disabled. To make changes or run the code, click
          <span className="mx-1 font-medium text-white">Make a Copy</span>.
        </p>
      }
      setShowModal={setShowModal}
    />
  );
};

export default ReadOnlyInfoModal;
