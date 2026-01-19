import { IBreadcrumbData } from "@/@types/files";
import { appUrls } from "@/config/navigation.config";
import { themeConfig } from "@/config/themeConfig";
import { jetBrainsMono } from "@/fonts";
import { cn } from "@/lib/utils";
import { setFolderId } from "@/redux/slices/fileFolderSlice";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import Link from "next/link";
import React from "react";
import { MdChevronRight, MdFolder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const FilesBreadcrumbs = ({ items }: { items: IBreadcrumbData[] }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const dispatch = useDispatch();

  return (
    <div className="flex items-center text-xs">
      <button
        onClick={() => {
          dispatch(setFolderId(null));
        }}
        className={cn(
          "transition-colors",
          "text-white/50 hover:bg-white/15! hover:text-white! p-1 font-medium cursor-pointer flex items-center justify-center rounded-md ",
          "translate-y-[5px]",
          jetBrainsMono.className
        )}
      >
        <MdFolder size={16} />
      </button>
      {items?.map((x, i) => {
        const isLast = i === items.length - 1;
        return (
          <div key={i} className="flex items-center justify-center mt-3">
            <span
              className="px-1 flex items-center justify-center "
              style={{
                color: theme.disabledTextColor,
              }}
            >
              <MdChevronRight />
            </span>
            <button
              onClick={() => {
                dispatch(setFolderId(x.id));
              }}
              className={cn(
                "transition-colors font-medium",
                isLast
                  ? "text-white"
                  : "text-white/50 hover:text-white! hover:bg-white/15! px-2! rounded-md flex! items-center! justify-center! gap-x-1! cursor-pointer",
                jetBrainsMono.className
              )}
            >
              {x.name}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FilesBreadcrumbs;
