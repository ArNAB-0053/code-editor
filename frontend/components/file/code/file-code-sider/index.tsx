import { FilePluxBelowCircle } from "@/assets/FolderIcon";
import FileFolderTree from "./file-folder-tree";
import { FiFolderPlus } from "react-icons/fi";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { FaArrowRightLong } from "react-icons/fa6";
import { FilesModal, FolderModal } from "@/components/modals/files";
import { useState } from "react";

const FileCodeSider = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const [openFile, setOpenFile] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  return (
    <div>
      <FileFolderTree />

      <span
        className="ml-3 flex items-center gap-x-1 rounded-bl-xl text-white absolute top-0 right-0 py-1 px-2 bg-white/10 backdrop-blur-2xl "
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

        <Link
          href={appUrls.FILE}
          style={{
            color: theme.textColor,
          }}
          className="hover:bg-white/10 p-1 rounded-md cursor-pointer opacity-60 hover:opacity-90 transition-all duration-150 ease-linear"
        >
          <FaArrowRightLong size={15.5} />
        </Link>
      </span>

      <FilesModal open={openFile} setOpen={setOpenFile} />
      <FolderModal open={openFolder} setOpen={setOpenFolder} />
    </div>
  );
};

export default FileCodeSider;
