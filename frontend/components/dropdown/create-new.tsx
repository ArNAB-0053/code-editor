"use client";

import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";

import { themeConfig } from "@/config/themeConfig";

import { Dropdown } from "antd";
import { CButton } from "../ui/custom";

import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import { FaFolderPlus } from "react-icons/fa6";
import { SetterFunctionTypesBool } from "@/@types/_base";

interface CreateNewDropdownProps {
  setOpenFile: SetterFunctionTypesBool;
  setOpenFolder: SetterFunctionTypesBool;
}

const CreateNewDropdown = ({
  setOpenFile,
  setOpenFolder,
}: CreateNewDropdownProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
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
                    <span className="translate-x-0.5">Create New Folder</span>
                  </div>
                </CButton>
              </div>
            ),
          },
        ],
      }}
      className="cursor-pointer "
      rootClassName=" backdrop-blur-xl rounded-xl p-0! "
      styles={{
        root: {
          backgroundColor: `${theme.border10}`,
        },
      }}
    >
      <div
        className="flex items-center justify-center gap-x-2 py-1.5 px-3 rounded-md text-sm hover:opacity-80 transition-all duration-200 ease-linear cursor-pointer font-medium w-full"
        style={{
          backgroundColor: theme.activeColor,
          color: theme.textColor,
        }}
      >
        <FaFolderPlus />
        {/* Create New */}
      </div>
    </Dropdown>
  );
};

export default CreateNewDropdown;
