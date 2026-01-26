import { ChangePasswordForm } from "@/components/forms/change-password/R";
import { IModalProps } from "@/@types/_base";
import { AModal } from "@/components/ui/antd";

export const ChangedPasswordModal = ({ open, setOpen }: IModalProps) => {
  return (
    <AModal
      title="Change Password"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]!"
    >
      <ChangePasswordForm setOpen={setOpen} />
    </AModal>
  );
};
