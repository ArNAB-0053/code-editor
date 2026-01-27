import { SetterFunctionTypesBool } from "@/@types/_base";
import CInfoModal from "../info-modal";
import { cn } from "@/lib/utils";
import { DangerIcon } from "@/assets/Icons";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

interface ConfirmDeleteModalProps {
  setShowModal: SetterFunctionTypesBool;
  onClick: () => void;
  showModal?: boolean;
  title: string | ReactElement;
  description: string | ReactElement;
  buttonText?: string;
}

export const CustomConfirmDeleteModal = ({
  setShowModal,
  onClick,
  showModal,
  title,
  description,
  buttonText,
}: ConfirmDeleteModalProps) => {
  const websiteFont = useSelector(selectWebsiteFont)
  const font = websiteFonts[websiteFont as WebsiteFontsKey]
  return (
    <CInfoModal
      Icon={
        <div className="flex h-12 w-12 mb-3 items-center justify-center rounded-full bg-red-500/30 text-red-500">
          <DangerIcon />
        </div>
      }
      title={
        <h2
          className={cn(
            "text-base font-semibold text-center flex items-center gap-x-1",
          )}
        >
          {title}
        </h2>
      }
      description={description}
      setShowModal={setShowModal}
      showCancel
      closeOnClickOutside
      onClick={onClick}
      showModal={showModal}
      buttonClassName={cn("bg-red-500 hover:bg-red-500/80 text-white! ")}
      buttonText={buttonText ? buttonText : "Delete"}
      font={font?.className}
    />
  );
};
