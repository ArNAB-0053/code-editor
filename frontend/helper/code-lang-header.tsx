import { appUrls } from "@/config/navigation.config";

import { HomeIcon } from "lucide-react";
import { FolderCodeIcon } from "@/assets/FolderIcon";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import TrashIcon from "@/assets/TrashIcon";

export const codeLangHeaderNormalLinks = [
  { link: "/", icon: <HomeIcon className="w-full h-full" />, tooltip: "Home" },
  // { link: appUrls.ABOUT, icon: <FolderCodeIcon className="w-full h-full" />, tooltip: "About" },
];

export const codeLangHeaderFileBasedLinks = [
  { link: appUrls.FILE, icon: <FolderCodeIcon className="w-full h-full" />, tooltip: "Folder & File" },
  {
    link: appUrls.SHARE.WITH_ME,
    icon: <ShareWithMeIcon className="w-full h-full" />,
    tooltip: "Shared With Me",
  },
  {
    link: appUrls.SHARE.BY_ME,
    icon: <ShareByMeIcon className="w-full h-full" />,
    tooltip: "Shared By Me",
  },
  { link: appUrls.TRASH, icon: <TrashIcon className="w-full h-full" />, tooltip: "Trash" },
];
