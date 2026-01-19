import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

import { appUrls } from "@/config/navigation.config";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HomeIcon, NotebookPen } from "lucide-react";
import { FilesIcon } from "@/assets/EditorSidebar/FilesIcon";
import { LangIcon } from "@/assets/EditorSidebar/LangIcon";
import { FolderCodeIcon } from "@/assets/FolderIcon";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { FaSlidersH, FaTrash } from "react-icons/fa";
import ATooltip from "../ui/antd/tooltip";
import TrashIcon from "@/assets/TrashIcon";
import { AvatarDropdown } from "../profile/avatar";
import { useState } from "react";
import PreferenceModal from "../modals/preference";
import { EDITOR_HEIGHT } from "@/helper/_base.helper";

const links = [
  { link: "/", icon: <HomeIcon />, tooltip: "Home" },
  { link: appUrls.FILE, icon: <FolderCodeIcon />, tooltip: "Folder & File" },
  {
    link: appUrls.SHARE.WITH_ME,
    icon: <ShareWithMeIcon />,
    tooltip: "Shared With Me",
  },
  {
    link: appUrls.SHARE.BY_ME,
    icon: <ShareByMeIcon />,
    tooltip: "Shared By Me",
  },
  { link: appUrls.TRASH, icon: <TrashIcon />, tooltip: "Trash" },
];

const sidebarItems = [
  { link: appUrls.CODE, icon: <FilesIcon />, tooltip: "Code" },
  { link: appUrls.LANG, icon: <LangIcon />, tooltip: "Langs" },
];

const AllEditorSider = () => {
  const [open, setOpen] = useState(false);
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const pathname = usePathname();

  const activeTab = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <div
      className="w-14 flex items-center justify-between flex-col border-l border-t pb-2 "
      style={{
        height: EDITOR_HEIGHT,
        // backgroundColor: `${theme.border10}`,
        borderTopColor: theme.border20,
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
      }}
    >
      <div className="w-14 flex items-center flex-col ">
        <>
          {sidebarItems.map((x, i) => (
            <ATooltip
              key={i}
              title={x.tooltip}
              placement="right"
              offset={[-5, 20]}
            >
              <div
                className={cn(
                  " w-full flex items-center justify-center border-l-2",
                  activeTab(x.link)
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100",
                  transitionString,
                )}
                style={{
                  borderColor: activeTab(x.link)
                    ? theme.textColor
                    : "transparent",
                }}
              >
                <Link
                  href={x.link}
                  className="w-full h-full py-3 flex items-center justify-center"
                >
                  {x.icon}
                </Link>
              </div>
            </ATooltip>
          ))}

          <ATooltip title="Create Note" placement="right" offset={[-5, 20]}>
            <button
              className={cn(
                "w-8/10 h-full py-3 rounded-md flex items-center justify-center mt-3 border cursor-pointer hover:opacity-80",
                transitionString,
              )}
              style={{
                backgroundColor: `${theme.activeColor}50`,
                borderColor: `${theme.activeColor}90`,
                // color: theme.activeColor,
              }}
            >
              {/* <LuNotebookPen /> */}
              {/* <NotesIcon /> */}
              <NotebookPen size={18} strokeWidth={2.5} />
            </button>
          </ATooltip>
        </>

        {/* <div className="mt-8 mb-2 w-full flex items-center justify-center flex-col">
          <div
            className="w-8/10 h-px opacity-60 mb-0.5"
            style={{ backgroundColor: theme.disabledTextColor }}
          />
          <div
            className="w-full h-px opacity-60  "
            style={{ backgroundColor: theme.disabledTextColor }}
          />
          <span
            className="text-xs uppercase py-2 font-medium w-full text-center "
            style={{
              color: theme.disabledTextColor,
              backgroundColor: theme.border5,
            }}
          >
            Links
          </span>
          <div
            className="w-full h-px opacity-60 mb-0.5"
            style={{ backgroundColor: theme.disabledTextColor }}
          />
          <div
            className="w-8/10 h-px opacity-60 "
            style={{ backgroundColor: theme.disabledTextColor }}
          />
        </div> */}

        {/* {links.map((x, i) => (
          <ATooltip
            key={i}
            title={x.tooltip}
            placement="right"
            offset={[-5, 20]}
          >
            <div
              className={cn(
                " w-full flex items-center justify-center  opacity-60 hover:opacity-100",
                transitionString,
              )}
            >
              <Link
                href={x.link}
                className="w-full h-full py-3 flex items-center justify-center"
              >
                {x.icon}
              </Link>
            </div>
          </ATooltip>
        ))} */}
      </div>

      <div className="py-3 w-full flex items-center justify-center flex-col gap-y-6">
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "opacity-80 hover:opacity-100 cursor-pointer w-full flex items-center justify-center py-3",
            transitionString,
          )}
        >
          <FaSlidersH />
        </button>
        <AvatarDropdown
          offset={[50, -40]}
          background={theme.activeColor}
          color={theme.textColor}
          borderColor={theme.activeColor}
          isSider
          horizontalLineClassName="w-[80%]!"
        />
      </div>

      <PreferenceModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default AllEditorSider;
