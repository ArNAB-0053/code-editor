import { StyledAModal } from ".";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { CButton } from "@/components/ui/custom";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

interface ConfirmDeleteModalProps {
  fileName: string;
  open: boolean;
  setOpen: SetterFunctionTypesBool;
}

export const ConfirmDeleteModal = ({
  fileName,
  open,
  setOpen,
}: ConfirmDeleteModalProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <StyledAModal
      title={null}
      open={open}
      closeIcon={null}
      onCancel={() => setOpen(false)}
      footer={null}
      className="overflow-hidden! md:w-[25rem]! "
      useSideIndicator={false}
      centered
    >
      <div className="flex justify-center flex-col w-full px-5 py-3 ">
        <h1 className=" font-semibold text-lg">
          Permanently delete this file?
        </h1>
        <span className=" my-4 text-sm opacity-80">
          This action will permanently delete <b>{fileName}</b>. You won’t be
          able to recover it later.
        </span>

        <div className="flex items-center justify-end gap-x-3 mt-2">
          <CButton
            className="flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
            variant="transparent"
            hoverBgColor={`${theme.border15}`}
            onClick={() => setOpen(false)}
          >
            <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
              {/* <MdDriveFileRenameOutline size={18} /> */}
              Cancel
            </div>
          </CButton>

          <CButton
            className=" flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
            // variant="transparent"
            type="danger"
          >
            <div className=" flex! items-center! justify-start! gap-x-3! px-4.5 py-1.5 hover:opacity-80 w-full font-semibold transition-all duration-200 ease-linear">
              <MdDeleteForever size={18} />
              Delete
            </div>
          </CButton>
        </div>
      </div>
    </StyledAModal>
  );
};
