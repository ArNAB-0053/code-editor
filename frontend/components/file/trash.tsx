import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { TrashImage } from "@/assets/TrashImage";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId, useHardDeleteAll } from "@/services/files";
import FileComponent from "./file-component";
import { IFilesListResponse } from "@/@types/files";
import { FaCircleInfo } from "react-icons/fa6";
import { transitionString } from "@/styles";
import { useState } from "react";
import { CustomConfirmDeleteModal } from "../modals/three-dot/delete";

const Trash = () => {
  const [open, setOpen] = useState(false);
  const userId = useSelector(selectedUserId);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const payload = {
    OwnerId: userId,
    IsDeleted: true,
  };
  const { data: deletedFolderFiles, isLoading } = useFileListByUserId(payload);
  const { mutateAsync: deleteAll } = useHardDeleteAll(userId);

  const isEmpty =
    !isLoading &&
    deletedFolderFiles?.data?.files.length === 0 &&
    deletedFolderFiles?.data?.folders.length === 0;

  return (
    <div
      className="h-full rounded-xl relative"
      // style={{
      //   backgroundColor: isEmpty ? theme.border5 : "transparent",
      // }}
    >
      {isLoading && <p>Loading ...</p>}
      {isEmpty && (
        <div
          className={cn(
            "flex items-center justify-center h-full flex-col absolute left-0 -top-10 w-full",
            font?.className,
          )}
        >
          <div
            className="p-10 rounded-full"
            style={{
              backgroundColor: theme.border5,
            }}
          >
            <TrashImage className=" w-36 aspect-square" />
          </div>
          <span
            className={cn(font?.className, "text-xl font-semibold mt-8")}
            style={{ color: theme.textColor }}
          >
            Trash is Empty
          </span>
          <p
            style={{
              color: theme.disabledTextColor,
            }}
            className="text-sm mt-2 opacity-80"
          >
            Deleted files and folders will stay here for <b>30</b> days before
            being permanently removed.
          </p>
        </div>
      )}

      {!isEmpty && (
        <div className="flex items-center justify-between gap-x-3 bg-yellow-500/10 text-yellow-400 px-2 py-2 rounded-xl mb-3">
          <span className="text-sm opacity-80 tracking-tight leading-[17px] flex items-center gap-x-2  ">
            <FaCircleInfo />
            <p>
              <strong className="mr-2!">Note :</strong>
              Deleted files and folders will stay here for <b>30</b> days before
              being permanently removed.
            </p>
          </span>
          <button
            className={cn(
              "w-fit text-xs py-1 px-2 rounded-md hover:opacity-80! cursor-pointer relative",
              transitionString,
            )}
            style={{
              backgroundColor: theme.border10,
            }}
            onClick={() => setOpen(true)}
          >
            Delete All
          </button>
        </div>
      )}

      <CustomConfirmDeleteModal
        showModal={open}
        setShowModal={setOpen}
        title="Permanently Delete All Files and Folder ?"
        description={
          <p className="text-[13px] text-center leading-tight text-neutral-400 mb-2">
            This action will permanently delete all files and folder. You won’t
            be able to recover it later.
          </p>
        }
        onClick={() => {
          setOpen(false)
          deleteAll()
        }}
        buttonText="Delete All"
      />

      <FileComponent
        files={deletedFolderFiles as IFilesListResponse}
        isLoading={isLoading}
        isTrash
      />
    </div>
  );
};

export default Trash;
