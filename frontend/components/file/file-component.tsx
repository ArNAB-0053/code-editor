"use client";
import { useSelector } from "react-redux";
import { EmptyContent } from "../empty";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import FilesCard from "./card";
import {
  IBreadcrumbData,
  IFileFolder,
  IFilesListResponse,
} from "@/@types/files";
import { FaFolder } from "react-icons/fa";
import { appUrls } from "@/config/navigation.config";
import { cn } from "@/lib/utils";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import ThreeDotDropdown from "./three-dot-dropdown";
import CreateNew from "./create-new";
import { useParams, usePathname } from "next/navigation";
import FilesBreadcrumbs from "../files-breadcrumbs";
import { useBreadcrumbs } from "@/services/files";
import { selectFolderId, setFolderId } from "@/redux/slices/fileFolderSlice";
import { useDispatch } from "react-redux";
import BreadcrumbLoader from "../Loaders/breadcrumbs";

interface FileComponentProps {
  files: IFilesListResponse;
  isLoading: boolean;
  isTrash?: boolean;
  isFileComponentPage?: boolean;
}

const FileComponent = ({
  files,
  isLoading,
  isTrash = false,
  isFileComponentPage = false,
}: FileComponentProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  // console.log(files);

  const isEmpty =
    !isLoading &&
    files?.data?.files?.length === 0 &&
    files?.data?.folders?.length === 0;

  const isFileEmpty = !isLoading && files?.data?.files?.length === 0;
  const isFolderEmpty = !isLoading && files?.data?.folders?.length === 0;

  // breadcrumbs
  const currentFolderId = useSelector(selectFolderId);
  // console.log("currentFolderId", currentFolderId);

  const dispatch = useDispatch();

  const { data: breadcrumbsData, isLoading: isBreadcrumbLoading } =
    useBreadcrumbs(currentFolderId as string);

  return (
    <div className={font?.className}>
      {/* {isLoading && <div>Loading files...</div>} */}

      {!isTrash && currentFolderId &&
        (isBreadcrumbLoading ? (
          <BreadcrumbLoader />
        ) : (
          <FilesBreadcrumbs
            items={breadcrumbsData?.data as IBreadcrumbData[]}
          />
        ))}

      {isEmpty && !isTrash && (
        <div
          className={cn(
            "w-full ",
            isFileComponentPage
              ? "min-h-[50vh] flex flex-col items-center justify-center"
              : "mt-2"
          )}
          // style={{
          //   backgroundColor: theme.border10,
          // }}
        >
          <EmptyContent
            boxClassName=" opacity-50"
            title="No files created yet"
            titleClassName="text-md opacity-60"
          />
        </div>
      )}

      {/* FOLDERS LIST */}
      {!isEmpty && !isFolderEmpty && (
        <p
          className={cn(
            "text-[11px] font-semibold  mb-0.5 pl-px uppercase",
            font?.className,
            isTrash ? "" : "mt-6"
          )}
          style={{
            color: theme.disabledTextColor,
          }}
        >
          All Folders
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 w-full gap-2 lg:gap-3 ">
        {files?.data?.folders?.map((folder, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundColor: theme.border10,
                color: theme.textColor,
              }}
              className={cn(
                "flex items-center justify-between pl-2 pr-2 md:pl-4 lg:pl-5 xl:pl-6  opacity-90 gap-x-2 rounded-xl text-sm ",
                isTrash
                  ? ""
                  : "hover:opacity-70 transition-all duration-200 ease-linear "
              )}
            >
              {isTrash ? (
                <>
                  <div
                    className="flex items-center justify-start opacity-90 text-sm gap-x-2 py-2 lg:py-3"
                    style={{
                      color: theme.textColor,
                    }}
                  >
                    <FaFolder className="w-6" />
                    <p className="truncate">{folder.fileName}</p>
                  </div>
                  <ThreeDotDropdown
                    fileId={folder.id}
                    isTrash={isTrash}
                    fileName={folder.fileName}
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      dispatch(setFolderId(folder.id));
                    }}
                    className="flex items-center justify-start opacity-90 text-sm gap-x-2 py-2 lg:py-3 cursor-pointer"
                    style={{
                      color: theme.textColor,
                    }}
                  >
                    <FaFolder className="w-6" />
                    <p className="truncate">{folder.fileName}</p>
                  </button>
                  <ThreeDotDropdown
                    fileId={folder.id}
                    isTrash={isTrash}
                    fileName={folder.fileName}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* FILES LIST */}
      <div className=" mt-6 mb-6">
        {!isEmpty && !isFileEmpty && (
          <p
            className={cn(
              "text-[11px] font-semibold mb-0.5 pl-px uppercase",
              font?.className
            )}
            style={{
              color: theme.disabledTextColor,
            }}
          >
            All Files
          </p>
        )}
        <FilesCard data={files?.data as IFileFolder} isTrash={isTrash} />
      </div>
    </div>
  );
};

export default FileComponent;
