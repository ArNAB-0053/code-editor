"use client";
import { RiGithubFill } from "react-icons/ri";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { X } from "lucide-react";
import FileLangLayoutButtons from "./layout-buttons";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { RxEnterFullScreen } from "react-icons/rx";
import { useState } from "react";
import { PublishFileModal, PublishRepoModal } from "../modals/github/publish";
import { FaChevronRight } from "react-icons/fa";
import { Dropdown } from "antd";
import { CButton, CDivider } from "../ui/custom";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FullscreenButton } from "./fullscreen-btn";

const FileLanglayoutHeader = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openRepo, setOpenRepo] = useState(false);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <header
      className="h-10 w-full flex items-center justify-between border-b "
      style={{
        backgroundColor: theme.border5,
        borderBottom: theme.border,
      }}
    >
      <div className="pl-3">Logo</div>
      <div className="flex items-center justify-end gap-x-6 h-full">
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 1,
                label: (
                  <div
                    className="flex items-center justify-center flex-col w-[9rem] py-1! overflow-hidden"
                    style={{
                      backgroundColor: theme.border5,
                    }}
                  >
                    <CButton
                      className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! p-0!"
                      variant="transparent"
                      hoverBgColor={theme.activeColor}
                      onClick={() => setOpenRepo(true)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-start px-4 py-1 hover:opacity-100 w-full opacity-80",
                          font?.className
                        )}
                      >
                        A New Repo
                      </div>
                    </CButton>
                    <CDivider className="mt-0! mb-0!" />
                    <CButton
                      className="w-full! rounded-none! flex! items-center! justify-start! gap-x-3! border-none! group! p-0!"
                      variant="transparent"
                      hoverBgColor={theme.activeColor}
                      onClick={() => setOpenFile(true)}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-start px-4 py-1 hover:opacity-100 w-full opacity-80 ",
                          font?.className
                        )}
                      >
                        A New File
                      </div>
                    </CButton>
                  </div>
                ),
              },
            ],
          }}
          className="cursor-pointer "
          rootClassName=" backdrop-blur-xl! rounded-md! p-0! "
          styles={{
            root: {
              backgroundColor: `${theme.border10}`,
            },
          }}
        >
          <button
            className={cn(
              " flex items-center gap-x-2 relative mr-1 px-3 rounded-sm opacity-80 hover:opacity-100 cursor-pointer",
              transitionString
            )}
            //   onClick={async () => await createGithubRepo("testing")}
            // onClick={() => setOpen(true)}
            style={{
              backgroundColor: theme.border20,
              // borderWidth: "1px",
              // borderColor: `${theme.textColor}80`,
            }}
          >
            <RiGithubFill size={18} />
            {/* <p className="text-xs underline underline-offset-4">P</p> */}
            <span className="flex items-center relative text-[12px] py-1 opacity-90 select-none">
              Publish
            </span>

            <FaChevronRight size={10} className="opacity-80 rotate-90" />
          </button>
        </Dropdown>

        <div className="w-0.5 h-6 " style={{ backgroundColor: theme.border }} />

        <div className="flex items-center justify-end gap-x-3 h-full">
          <FileLangLayoutButtons />

         <FullscreenButton/>

          <button className="opacity-90 cursor-pointer bg-red-600 h-full px-3">
            <X size={20} />
          </button>
        </div>
      </div>

      <PublishFileModal open={openFile} setOpen={setOpenFile} />
      <PublishRepoModal open={openRepo} setOpen={setOpenRepo} />
    </header>
  );
};

export default FileLanglayoutHeader;
