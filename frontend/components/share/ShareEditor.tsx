"use client";
import { useParams } from "next/navigation";
import EditorComponent from "../editor/editor";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  selectedLang,
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useSharedData } from "@/services/share";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";
import {
  IShareDataModel,
} from "@/@types/share";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { FaInfoCircle } from "react-icons/fa";

export const OWNER_WIDTH = "25rem";

type ShareEditorType = {
  sharedData: IShareDataModel;
  isLoading: boolean;
  heading?: string | ReactElement;
  detailsComponent: ReactElement;
};

const ShareEditor = ({ sharedData, isLoading, heading, detailsComponent }: ShareEditorType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const lang = useSelector(selectedLang);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full flex gap-x-2">
      <EditorComponent p_lang={sharedData?.lang?.trim() || lang} isShared />
      <div
        className=" text-wrap text-white overflow-x-hidden"
        style={{
          width: OWNER_WIDTH,
          height: "calc(100vh - 50px - 20px)",
        }}
      >
        <div
          className={cn(
            "flex items-center gap-x-2 mb-2 w-full py-2 px-4 text-sm overflow-hidden border-l-3",
            font?.className
          )}
          style={{
            background: `${theme?.textColor}10`,
            color: theme?.disabledTextColor,
            borderLeftColor: theme?.activeColor,
          }}
        >
          <FaInfoCircle />
          {heading}
        </div>
        {detailsComponent}
      </div>
    </div>
  );
};

export default ShareEditor;
