import {
  FilePluxBelowCircle,
  FolderClose,
  FolderOpen,
} from "@/assets/FolderIcon";
import FileFolderTree from "./file-folder-tree";
import { FiFolderPlus } from "react-icons/fi";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { FilesModal, FolderModal } from "@/components/modals/files";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileTypeEnum } from "@/@types/_enums";
import { jetBrainsMono } from "@/fonts";
import { getExtention, getFileIcon } from "@/helper/getExtention";
import { cn } from "@/lib/utils";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { ThreeDotDropdown } from "@/components/dropdown/three-dot-dropdown";

export interface DataNode {
  title: string | ReactNode;
  key: string;
  isLeaf?: boolean;
  fileType: FileTypeEnum;
  fileName: string;
  children?: DataNode[];
  lang?: string;
}

interface TitleRenderProps {
  node: DataNode;
  isExpanded: boolean;
  setOpenFile: SetterFunctionTypesBool;
  setOpenFolder: SetterFunctionTypesBool;
}

const transitionClassNameString =
  "opacity-0 group-hover:opacity-100 transition-all duration-200 ease-linear pointer-events-none group-hover:pointer-events-auto";

export const TitleRenderComponent = ({
  node,
  isExpanded,
  setOpenFile,
  setOpenFolder,
}: TitleRenderProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className="w-full h-full group flex items-center ">
      <span className={cn("truncate max-w-[200px] flex items-center ")}>
        <AnimatePresence mode="wait" initial={false}>
          {node.fileType === FileTypeEnum.FILE ? (
            <p
              className={cn(
                "bg-white/20 px-1 h-3 rounded-md flex items-center justify-center text-[11px] mr-2",
                jetBrainsMono.className
              )}
            >
              {getFileIcon(node?.lang as string)}
            </p>
          ) : (
            <motion.span
              key={isExpanded ? "open" : "closed"}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="flex items-center mr-2"
            >
              {isExpanded ? (
                <FolderOpen size={14} />
              ) : (
                <FolderClose size={14} />
              )}
            </motion.span>
          )}
        </AnimatePresence>

        {node.title}
        <span className="ml-0.5">
          {node?.fileType === FileTypeEnum.FILE &&
            getExtention(node?.lang as string)}
        </span>
      </span>

      {node.key === "root" ? (
        <span
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 ml-3 flex items-center gap-x-1 rounded-bl-xl text-white px-2  backdrop-blur-2xl ",
            transitionClassNameString
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <button
            onClick={() => setOpenFile(true)}
            className="hover:bg-white/10 p-1 rounded-md cursor-pointer opacity-60 hover:opacity-90 transition-all duration-150 ease-linear"
          >
            <FilePluxBelowCircle size={15.5} />
          </button>

          <button
            onClick={() => setOpenFolder(true)}
            className="hover:bg-white/10 p-1 rounded-md cursor-pointer opacity-60 hover:opacity-90 transition-all duration-150 ease-linear"
          >
            <FiFolderPlus size={15.5} />
          </button>
        </span>
      ) : (
        <div
          className={cn("absolute right-0 top-0", transitionClassNameString)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ThreeDotDropdown
            fileId={node.key}
            isFile={node.fileType === FileTypeEnum.FILE}
            fileName={node.fileName}
            lang={node.lang}
          />
        </div>
      )}
    </div>
  );
};

const FileCodeSider = () => {
  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  return (
    <>
      <FileFolderTree setOpenFile={setOpenFile} setOpenFolder={setOpenFolder} />
      <FilesModal open={openFile} setOpen={setOpenFile} />
      <FolderModal open={openFolder} setOpen={setOpenFolder} />
    </>
  );
};

export default FileCodeSider;
