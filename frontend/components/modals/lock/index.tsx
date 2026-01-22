import React from "react";
import CInfoModal from "../info-modal";
import { FaCircleInfo } from "react-icons/fa6";
import { asap } from "@/fonts";
import { cn } from "@/lib/utils";
import { SetterFunctionTypesBool } from "@/@types/_base";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";

const LockInfoModal = ({
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
        <h2 className="text-base font-semibold text-center flex items-center gap-x-1">
          This feature is
          <span
            className={cn(
              "font-semibold underline underline-offset-4 italic text-[17px] translate-y-px",
              asap.className,
            )}
          >
            locked.
          </span>
        </h2>
      }
      description={
        <p className="text-[12px] text-center leading-tight text-neutral-400 mb-2">
          You can explore and preview this feature, but full access is available
          only after creating an account.
          <br />
          <span className="mt-1 inline-block">
            <Link
              href={appUrls.REGISTER}
              className="text-white! italic! underline! underline-offset-2! mr-1!"
            >
              Sign up
            </Link>
            or
            <Link
              href={appUrls.LOGIN}
              className="text-white! mx-1! italic! underline! underline-offset-2!"
            >
              log in
            </Link>
            to unlock editing, saving, and more.
          </span>
        </p>
      }
      setShowModal={setShowModal}
    />
  );
};

export default LockInfoModal;
