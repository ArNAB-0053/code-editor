import { CButton } from "@/components/ui/custom";
import React from "react";
import { StyledAModal } from ".";
import {
  SetterFunctionTypesBool,
  SetterFunctionTypesString,
} from "@/@types/_base";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { getExtention } from "@/helper/getExtention";
import { IFileRenameRequest } from "@/@types/files";
import { useRename } from "@/hooks/useRenameFileFolder";
import { selectedUserId } from "@/redux/slices/userSlice";

interface RenameModalProps {
  openRename: boolean;
  setOpenRename: SetterFunctionTypesBool;
  isFile?: boolean;
  renameFile: string;
  setRenameFile: SetterFunctionTypesString;
  lang?: string;
  fileId: string;
}

export const RenameModal = ({
  openRename,
  setOpenRename,
  isFile,
  renameFile,
  setRenameFile,
  lang,
  fileId,
}: RenameModalProps) => {
  const userId = useSelector(selectedUserId);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const { rename } = useRename();

  const renamePayload: IFileRenameRequest = {
    FileId: fileId,
    OwnerId: userId,
    FileName: renameFile,
  };

  const handleRename = () => {
    rename(renamePayload);
    setOpenRename(false);
  };
  return (
    <StyledAModal
      title={<h1 className=" font-semibold text-lg pl-1">Rename</h1>}
      open={openRename}
      closeIcon={null}
      onCancel={() => setOpenRename(false)}
      footer={null}
      className="overflow-hidden! md:w-[25rem]! "
      centered
    >
      <div className="flex justify-center flex-col w-full px-5 py-2 ">
        {isFile ? (
          <div
            className="mt-2 py-2 px-3 rounded-md flex items-center justify-between"
            style={{
              background: theme.background,
            }}
          >
            <input
              value={renameFile}
              onChange={(e) => setRenameFile(e.target.value)}
              className=" outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                } else if (e.key === "Escape") {
                  setOpenRename(false);
                }
              }}
            />
            <span className="w-fit border-l pl-2 opacity-50">
              {getExtention(lang!)}
            </span>
          </div>
        ) : (
          <div
            className="my-2 py-2 px-3 rounded-md flex items-center justify-between"
            style={{
              background: theme.background,
            }}
          >
            <input
              value={renameFile}
              onChange={(e) => setRenameFile(e.target.value)}
              className=" outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRename();
                } else if (e.key === "Escape") {
                  setOpenRename(false);
                }
              }}
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-x-3 mt-4">
          <CButton
            className="flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
            variant="transparent"
            hoverBgColor={`${theme.border15}`}
            onClick={() => setOpenRename(false)}
          >
            <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
              {/* <MdDriveFileRenameOutline size={18} /> */}
              Cancel
            </div>
          </CButton>

          <CButton
            className=" flex! items-center! justify-start! gap-x-3! border-none! group! p-0! hover:opacity-80! transition-all! duration-200! ease-linear!"
            // variant="sameBg"
            onClick={handleRename}
          >
            <div className=" flex! items-center! justify-start! gap-x-3! px-4.5 py-1.5  w-full font-semibold ">
              {/* <MdDeleteForever size={18} /> */}
              Save
            </div>
          </CButton>
        </div>
      </div>
    </StyledAModal>
  );
};
