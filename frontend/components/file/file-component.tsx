"use client";
import { useFileListByUserId } from "@/services/files";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";
import { EmptyContent } from "../empty";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import FilesCard from "./card";
import { FaFolderPlus } from "react-icons/fa6";
import { useState } from "react";
import { Dropdown, Tabs } from "antd";
import { CButton } from "../ui/custom";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import { FilesModal, FolderModal } from "../modals/files";
import { IFileFolder } from "@/@types/files";
import { FaFolder } from "react-icons/fa";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { jetBrainsMono, websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { BsThreeDotsVertical } from "react-icons/bs";

const FileComponent = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  const userId = useSelector(selectedUserId);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const payload = {
    OwnerId: userId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  return (
    <div className={font?.className}>
      {isLoading && <div>Loading files...</div>}

      {!isLoading &&
        files?.data?.files?.length === 0 &&
        files?.data?.folders?.length === 0 && (
          <EmptyContent title="No files created yet" />
        )}

      <div className={cn("flex items-center justify-between", font?.className)}>
        <h1
          className="font-medium"
          style={{
            color: theme.textColor,
          }}
        >
          Folders & Files
        </h1>
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

      {/* FOLDERS LIST */}
      <p
        className={cn(
          "text-[11px] font-semibold mt-2 mb-0.5 pl-px uppercase",
          font?.className
        )}
        style={{
          color: theme.disabledTextColor,
        }}
      >
        All Folders
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 w-full gap-2 lg:gap-3">
        {files?.data?.folders?.map((folder, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: theme.border10,
                color: theme.textColor,
              }}
              className="flex items-center justify-between pl-2 pr-2 md:pl-4 lg:pl-5 xl:pl-6 py-2 lg:py-3 opacity-90 gap-x-2 rounded-xl text-sm hover:opacity-70 transition-all duration-200 ease-linear "
            >
              <Link
                href={`${appUrls.FILE}/${folder.id}`}
                className="flex items-center justify-start opacity-90 text-sm"
                style={{
                  color: theme.textColor,
                }}
              >
                <FaFolder className="w-6" />
                <p className="truncate">{folder.fileName}</p>
              </Link>
              <button className="p-1.5 hover:bg-white/5 rounded-full cursor-pointer">
                <BsThreeDotsVertical
                  size={14}
                  style={{
                    color: theme.textColor,
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* FILES LIST */}
      <div className=" mt-3 mb-6">
        <p
          className={cn(
            "text-[11px] font-semibold mb-0.5 pl-px uppercase",
            font?.className
          )}
          style={{
            color: theme.disabledTextColor,
          }}
        >
          All Files
        </p>
        <FilesCard data={files?.data as IFileFolder} />
      </div>
    </div>
  );
};

export default FileComponent;
