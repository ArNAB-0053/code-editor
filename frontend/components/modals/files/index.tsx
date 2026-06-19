import { AModal } from "@/components/ui/antd";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";
import { FileTypeEnum } from "@/@types/_enums";
import { FilesCreationForm, FolderCreationForm } from "@/components/forms/FilesCreationForm";

export const FilesModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: SetterFunctionTypesBool;
}) => {
  const userId = useSelector(selectedUserId);
  const currentFolderId = useSelector(selectFolderId);

  const initialValues = {
    OwnerId: userId,
    FileName: "",
    FileType: FileTypeEnum.FILE,
    Lang: "python",
    ParentId: currentFolderId,
  };
  return (
    <AModal
      title="Create New File"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]!"
    >
      <FilesCreationForm
        setOpen={setOpen}
        initialValues={initialValues}
        selecteLang
      />
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
      <FolderCreationForm setOpen={setOpen} />
    </AModal>
  );
};
