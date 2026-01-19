import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import React from "react";
import { MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";

const BreadcrumbLoader = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className=" h-6 mt-2 rounded-md animate-pulse flex items-center">
      <div className="bg-white/15! px-2! rounded-md w-16 h-4.5" />
      <span
        className="px-1 flex items-center justify-center "
        style={{
          color: theme.disabledTextColor,
        }}
      >
        <MdChevronRight />
      </span>
      <div className="bg-white/15! px-2! rounded-md w-16 h-4.5" />
      <span
        className="px-1 flex items-center justify-center "
        style={{
          color: theme.disabledTextColor,
        }}
      >
        <MdChevronRight />
      </span>
      <div className="bg-white/15! px-2! rounded-md w-16 h-4.5" />
    </div>
  );
};

export default BreadcrumbLoader;
