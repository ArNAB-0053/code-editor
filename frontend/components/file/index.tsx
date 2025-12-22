"use client";
import { useFileListByUserId } from "@/services/files";
import ShareToAndByMe from "./share";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";
import { EmptyContent } from "../empty";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import FilesCard from "./card";
import { FaFolderPlus } from "react-icons/fa6";
import { useState } from "react";
import { Dropdown } from "antd";
import { CButton } from "../ui/custom";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import { FilesModal, FolderModal } from "../modals/files";

export const MAX_SHARE_VISIBLE = {
  TABLE: 8,
  CARD: 3,
  LIST: 2,
};

const FilesPage = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  const userId = useSelector(selectedUserId);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const payload = {
    OwnerId: userId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  console.log(files);

  return (
    <div className="mt-2">
      {isLoading && <div>Loading files...</div>}

      {!isLoading && files?.data?.length === 0 && (
        <EmptyContent title="No files created yet" />
      )}

      <div className="flex items-center justify-between">
        <h1 className="font-medium">All Files</h1>
        <div className="flex flex-col font-semibold text-start text-sm">
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: 1,
                  label: (
                    <div
                      className="flex items-center justify-center flex-col gap-y-1 w-[14rem] py-2! overflow-hidden"
                      style={{
                        backgroundColor: theme.border5,
                      }}
                    >
                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                        variant="transparent"
                        hoverBgColor={theme.activeColor}
                        onClick={() => setOpenFile(true)}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-4.5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <FiFilePlus size={18} />
                          Create New File
                        </div>
                      </CButton>

                      <CButton
                        className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! p-0!"
                        variant="transparent"
                        hoverBgColor={theme.activeColor}
                        onClick={() => setOpenFolder(true)}
                      >
                        <div className=" flex! items-center! justify-start! gap-x-3! opacity-70 px-5 py-1.5 hover:opacity-100 w-full font-semibold">
                          <FiFolderPlus size={18} />
                          <span className="translate-x-0.5">
                            Create New Folder
                          </span>
                        </div>
                      </CButton>
                    </div>
                  ),
                },
              ],
            }}
            className="cursor-pointer "
            rootClassName=" backdrop-blur-xl rounded-xl p-0! "
            overlayStyle={{
              backgroundColor: `${theme.border10}`,
            }}
          >
            <div
              className="flex items-center justify-center gap-x-2 py-1.5 px-3 rounded-xl text-sm hover:opacity-80 transition-all duration-200 ease-linear cursor-pointer font-semibold w-full"
              style={{
                backgroundColor: theme.border10,
                color: theme.disabledTextColor,
              }}
            >
              <FaFolderPlus />
              Create New
            </div>
          </Dropdown>
        </div>
      </div>

      <FilesModal open={openFile} setOpen={setOpenFile} />
      <FolderModal open={openFolder} setOpen={setOpenFolder} />

      {/* FILES LIST */}
      <div className=" mb-6">
        <FilesCard data={files?.data || []} />
      </div>

      {/* SHARE */}
      <ShareToAndByMe />
    </div>
  );
};

export default FilesPage;
