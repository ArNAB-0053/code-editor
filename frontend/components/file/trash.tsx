import { useSelector } from "react-redux";
import { EmptyContent } from "../empty";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { TrashImage } from "@/assets/TrashImage";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import FileComponent from "./file-component";
import { IFilesListResponse } from "@/@types/files";

const Trash = () => {
  const userId = useSelector(selectedUserId);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const payload = {
    OwnerId: userId,
    IsDeleted: true,
  };
  const { data: deletedFolderFiles, isLoading } = useFileListByUserId(payload);

  const isEmpty =
    !isLoading &&
    deletedFolderFiles?.data?.files.length === 0 &&
    deletedFolderFiles?.data?.files.length;

  return (
    <div
      className="h-full rounded-xl relative"
      style={{
        backgroundColor: isEmpty ? theme.border5 : "transparent",
      }}
    >
      {isLoading && <p>Loading ...</p>}
      {isEmpty && (
        <div
          className={cn(
            "flex items-center justify-center h-full flex-col absolute left-0 -top-10 w-full",
            font?.className
          )}
        >
          <div
            className="p-10 rounded-full"
            style={{
              backgroundColor: theme.border5,
            }}
          >
            <TrashImage className=" w-36 aspect-square" />
          </div>
          <span
            className={cn(font?.className, "text-xl font-semibold mt-8")}
            style={{ color: theme.textColor }}
          >
            Trash is Empty
          </span>
          <p
            style={{
              color: theme.disabledTextColor,
            }}
            className="text-sm mt-2 opacity-80"
          >
            Deleted files and folders will stay here for <b>30</b> days before
            being permanently removed.
          </p>
        </div>
      )}

      <FileComponent
        files={deletedFolderFiles as IFilesListResponse}
        isLoading={isLoading}
        isTrash
      />
    </div>
  );
};

export default Trash;
