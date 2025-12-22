import { AModal } from "@/components/ui/antd";
import { FilesCreationForm, FolderCreationForm } from "./creationForm";

export const FilesModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AModal
      title="Create New File"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]!"
    >
      <FilesCreationForm />
    </AModal>
  );
};

export const FolderModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AModal
      title="Create New File"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]!"
    >
      <FolderCreationForm />
    </AModal>
  );
};

