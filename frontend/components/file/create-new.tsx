"use client";

import { useState } from "react";
import { FilesModal, FolderModal } from "../modals/files";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";

import { cn } from "@/lib/utils";

import { themeConfig } from "@/config/themeConfig";

import { HeaderTitle } from "./header-title";

import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

import { FolderCodeIcon } from "lucide-react";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { transitionString } from "@/styles";
import { CodeFirstBlock, CodeLastBlock } from "@/assets/CodeComponentIcons";
import CreateNewDropdown from "../dropdown/create-new";

const CreateNew = ({ files }: { files: any }) => {
  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between pb-4",
          font?.className,
        )}
        style={{
          borderBottomWidth: "1px",
          borderBottomColor: `${theme.textColor}50`,
        }}
      >
        <HeaderTitle
          title="Folders & Files"
          Icon={<FolderCodeIcon size={20} color={theme.activeColor} />}
          subTitle={`${files?.data?.files?.length} files, ${files?.data?.folders?.length} folders`}
        />
        <div className="flex items-center justify-end gap-x-3">
          <Link
            href={appUrls.CODE}
            className=" text-xs py-1.5 w-26 rounded-md flex items-center gap-x-2 relative overflow-hidden group"
            style={{
              // backgroundColor: `${theme.activeColor}20`,
              // borderColor: theme.activeColor,
              color: theme.activeColor,
            }}
          >
            <div
              className="flex items-center justify-center gap-x-2 text-xs transition-all duration-200 ease-linear cursor-pointer font-medium w-full z-10 group"
              style={{
                color: theme.textColor,
              }}
            >
              <CodeFirstBlock
                size={18}
                className={cn(
                  "absolute left-2 hidden group-hover:block ",
                  transitionString,
                )}
              />
              <span className={cn("-translate-x-0.5", transitionString)}>
                Editor
                <b className={cn("group-hover:hidden", transitionString)}> </b>
                Mode
              </span>
              <CodeLastBlock
                size={17}
                className={cn(
                  "absolute right-0 hidden group-hover:block -translate-x-2",
                  transitionString,
                )}
              />
            </div>

            <div
              className={cn(
                "w-full h-full absolute -left-5 top-5 blur-[40px] group-hover:opacity-100 opacity-0 ",
                transitionString,
              )}
              style={{
                backgroundColor: theme.activeColor,
              }}
            />

            <div
              className="w-full h-full absolute left-0 top-0 -z-10"
              style={{
                backgroundColor: theme.activeColor,
              }}
            />
          </Link>
          <div className="flex flex-col font-semibold text-start text-sm">
            <CreateNewDropdown
              setOpenFile={setOpenFile}
              setOpenFolder={setOpenFolder}
            />
          </div>
        </div>
      </div>

      <FilesModal open={openFile} setOpen={setOpenFile} />
      <FolderModal open={openFolder} setOpen={setOpenFolder} />
    </>
  );
};

export default CreateNew;
