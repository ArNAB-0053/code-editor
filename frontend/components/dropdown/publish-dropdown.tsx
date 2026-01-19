"use client";
import { RiGithubFill } from "react-icons/ri";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { useState } from "react";
import { PublishFileModal, PublishRepoModal } from "../modals/github/publish";
import { FaChevronRight } from "react-icons/fa";
import { Dropdown } from "antd";
import { CButton, CDivider } from "../ui/custom";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

const PublishDropdown = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openRepo, setOpenRepo] = useState(false);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <>
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
                        font?.className,
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
                        font?.className,
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
            " flex items-center gap-x-2 relative mr-1 px-3 rounded-sm hover:opacity-85 opacity-100 cursor-pointer group",
            transitionString,
          )}
          //   onClick={async () => await createGithubRepo("testing")}
          // onClick={() => setOpen(true)}
          style={
            {
              // backgroundColor: theme.border20,
              // borderWidth: "1px",
              // borderColor: `${theme.textColor}80`,
            }
          }
        >
          <RiGithubFill size={18} />
          {/* <p className="text-xs underline underline-offset-4">P</p> */}
          <span
            className={cn(
              "flex items-center relative text-[12px] py-1  select-none tracking-wider",
              font?.className,
            )}
          >
            Publish
          </span>

          <FaChevronRight size={10} className={cn("opacity-100 rotate-90 ")} />
        </button>
      </Dropdown>

      <PublishFileModal open={openFile} setOpen={setOpenFile} />
      <PublishRepoModal open={openRepo} setOpen={setOpenRepo} />
    </>
  );
};

export default PublishDropdown;
