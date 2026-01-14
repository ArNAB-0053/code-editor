import { FolderCodeIcon } from "@/assets/FolderIcon";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import TrashIcon from "@/assets/TrashIcon";
import { appUrls } from "@/config/navigation.config";

export default function getFileRelatedLinks({ size = 20 }: { size?: number }) {
  const fileRelatedLinks = [
    {
      link: appUrls.FILE,
      icon: <FolderCodeIcon size={size} />,
      tooltip: "Folder & File",
    },
    {
      link: appUrls.SHARE.WITH_ME,
      icon: <ShareWithMeIcon size={size} />,
      tooltip: "Shared With Me",
    },
    {
      link: appUrls.SHARE.BY_ME,
      icon: <ShareByMeIcon size={size} />,
      tooltip: "Shared By Me",
    },
    { link: appUrls.TRASH, icon: <TrashIcon size={size} />, tooltip: "Trash" },
  ];

  return fileRelatedLinks;
}
