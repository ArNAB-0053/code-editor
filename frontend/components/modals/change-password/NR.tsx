import { SetterFunctionTypesBool } from "@/@types/_base";
import { ChangePasswordForm } from "@/components/forms/change-password/NR";
import { NRAModal } from "@/components/ui/no-redux";

interface NRChangedPasswordModalProps {
  id: string;
  username: string;
  open: boolean;
  setOpen: SetterFunctionTypesBool;
}

export const NRChangedPasswordModal = ({
  open,
  setOpen,
  id,
  username,
}: NRChangedPasswordModalProps) => {
  return (
    <NRAModal
      title="Change Password"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]! "
    >
      <ChangePasswordForm id={id} username={username} />
    </NRAModal>
  );
};
