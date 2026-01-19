import { SetterFunctionTypesBool } from "@/@types/_base";
import { AModal } from "@/components/ui/antd";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { FilesCreationForm } from "../files/creationForm";
import { FileTypeEnum } from "@/@types/_enums";

export const MakeACopyModal = ({
  open,
  setOpen,
  code,
  output,
  lang,
}: {
  open: boolean;
  setOpen: SetterFunctionTypesBool;
  code: string;
  output: string;
  lang: string;
}) => {
  const userId = useSelector(selectedUserId);

  return (
    <AModal
      title="Make a Copy"
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! w-full! md:w-[20rem]!"
    >
      <FilesCreationForm
        setOpen={setOpen}
        initialValues={{
          OwnerId: userId,
          FileName: "",
          FileType: FileTypeEnum.FILE,
          ParentId: null,
          Code: code,
          Output: output,
          Lang: lang,
        }}
      />
    </AModal>
  );
};
