import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

import { appUrls } from "@/config/navigation.config";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HomeIcon } from "lucide-react";
import { FilesIcon } from "@/assets/EditorSidebar/FilesIcon";
import { LangIcon } from "@/assets/EditorSidebar/LangIcon";
import { FolderCodeIcon } from "@/assets/FolderIcon";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { FaTrash } from "react-icons/fa";

const links = [
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
  { link: appUrls.TRASH, icon: <FaTrash />, tooltip: "Trash" },
];

const sidebarItems = [
  { link: appUrls.CODE, icon: <FilesIcon />, tooltip: "Code" },
  { link: appUrls.LANG, icon: <LangIcon />, tooltip: "Langs" },
];

const AllEditorSider = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const pathname = usePathname();

  const activeTab = (path: string) => {
    return pathname.includes(path);
  };

  return (
    <div
      className="w-14 flex items-center flex-col border-t border-l "
      style={{
        height: "calc(100svh - 68px)",
        backgroundColor: `${theme.border10}`,
        borderLeftColor: theme.border10,
        borderTopColor: theme.border10,
      }}
    >
      {sidebarItems.map((x, i) => (
        <div
          key={i}
          className={cn(
            " w-full flex items-center justify-center py-3  border-l-2",
            activeTab(x.link) ? "opacity-100" : "opacity-60 hover:opacity-100",
            transitionString
          )}
          style={{
            borderColor: activeTab(x.link) ? theme.textColor : "transparent",
          }}
        >
          <Link
            href={x.link}
            className="w-full h-full  flex items-center justify-center"
          >
            {x.icon}
          </Link>
        </div>
      ))}

      <div className="mt-8 mb-2 w-full flex items-center justify-center flex-col">
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
      </div>

      {links.map((x, i) => (
        <div
          key={i}
          className={cn(
            " w-full flex items-center justify-center py-3 opacity-60 hover:opacity-100",
            transitionString
          )}
        >
          <Link
            href={x.link}
            className="w-full h-full  flex items-center justify-center"
          >
            {x.icon}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllEditorSider;
