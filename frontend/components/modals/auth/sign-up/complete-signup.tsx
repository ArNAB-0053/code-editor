import { IModalProps } from "@/@types/_base";
import { CompleteSignUpForm } from "@/components/auth/forms/complete-signup";
import { AModal } from "@/components/ui/antd";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { IoIosWarning } from "react-icons/io";

const CompleteSignupModal = ({ open, setOpen }: IModalProps) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    if (open) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [open]);
  return (
    <AModal
      title="Complete your Sign Up"
      centered
      open={open}
      cancelText={null}
      closable={false}
      footer={false}
      maskClosable={false}
      keyboard={false}
      className="overflow-hidden w-[24rem]!"
    >
      <p className="text-xs mt-6 mb-4 flex items-center justify-center gap-x-4 bg-yellow-50/20 text-yellow-500 p-2 rounded-md animate-pulse">
        <IoIosWarning size={20} />
        <span className={cn("w-8/10", spaceGrotesk.className)}>
          Please <b>do not refresh or close this page.</b> Your account is not
          yet completed.
        </span>
      </p>
      <CompleteSignUpForm />
    </AModal>
  );
};

export default CompleteSignupModal;
