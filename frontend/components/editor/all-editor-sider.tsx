import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

import { appUrls } from "@/config/navigation.config";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { NotebookPen } from "lucide-react";
import { FilesIcon } from "@/assets/EditorSidebar/FilesIcon";
import { LangIcon } from "@/assets/EditorSidebar/LangIcon";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { FaSlidersH } from "react-icons/fa";
import ATooltip from "../ui/antd/tooltip";
import { AvatarDropdown } from "../profile/avatar";
import { useState } from "react";
import PreferenceModal from "../modals/preference";
import { EDITOR_HEIGHT } from "@/helper/_base.helper";
import DraggableComponent from "../draggable";
import { NotesIcon } from "@/assets/NotesIcon";
import { selectedUserId } from "@/redux/slices/userSlice";
import LockIcon from "@/assets/EditorSidebar/LockIcon";
import LockInfoModal from "../modals/lock";

const sidebarItems = [
  { link: appUrls.CODE, icon: <FilesIcon />, tooltip: "Code" },
  { link: appUrls.LANG, icon: <LangIcon />, tooltip: "Langs" },
];

const AllEditorSider = () => {
  const [open, setOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [lockOpen, setLockOpen] = useState(false);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const userId = useSelector(selectedUserId);

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

          <ATooltip
            title={!userId ? "Create an account to unlock this" : "Create Note"}
            placement="right"
            offset={[-5, 20]}
            rootClassName="max-w-[150px]! p-0!"
          >
            <button
              className={cn(
                "w-8/10 h-full py-3 rounded-md flex items-center justify-center mt-3 border relative transition-all",
                !userId
                  ? "cursor-not-allowed opacity-70"
                  : "cursor-pointer hover:opacity-80",
                transitionString,
              )}
              style={{
                backgroundColor: `${theme.activeColor}50`,
                borderColor: `${theme.activeColor}90`,
              }}
              onClick={() => {
                if (userId) setLockOpen(true);
                else setNoteOpen(!noteOpen);
              }}
            >
              <NotesIcon size={20} className={!userId ? "opacity-60" : ""} />

              {userId && (
                <>
                  <span className="absolute top-1 right-1 bg-black/60 rounded-full p-1 z-10">
                    <LockIcon size={16} className="opacity-80" />
                  </span>
                  <span className="absolute inset-0 rounded-md bg-black/10 backdrop-blur-[1px]" />
                </>
              )}
            </button>
          </ATooltip>
        </>
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
      <DraggableComponent open={noteOpen} setOpen={setNoteOpen} />
      {lockOpen && (
        <LockInfoModal setShowModal={setLockOpen} />
      )}
    </div>
  );
};

export default AllEditorSider;
