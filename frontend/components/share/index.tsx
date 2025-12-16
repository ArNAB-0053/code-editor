"use client";
import { useParams } from "next/navigation";
import EditorComponent from "../editor/editor";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  selectedLang,
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useSharedData } from "@/services/share";
import { useSelector } from "react-redux";
import { selectedUserId, selectedUserUsername } from "@/redux/slices/userSlice";
import { IOwnerDetails } from "@/@types/share";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import Owner from "./owner";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { spaceGrotesk, websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { FaInfoCircle } from "react-icons/fa";

export const OWNER_WIDTH = "25rem";

const ShareEditor = () => {
  const params = useParams();
  const shareId = params?.editorId;
  const userId = useSelector(selectedUserId);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const lang = useSelector(selectedLang);
  // const username = useSelector(selectedUserUsername);

  const [ownerDetails, setOwnerDetails] = useState<IOwnerDetails>();
  const ownerDetailsRef = useRef<IOwnerDetails>(null);

  // console.log(shareId, userId);

  const dispatch = useDispatch();

  const payload = {
    ShareId: String(shareId),
    CurrentUserId: userId,
  };

  const { data: sharedData, isLoading } = useSharedData(payload);
  // console.log(sharedData);

  useEffect(() => {
    if (!sharedData || isLoading) return;
    dispatch(setLangRedux(sharedData?.lang));
    dispatch(setCodeRedux(sharedData?.code));
    dispatch(setOutputRedux(sharedData?.output));

    ownerDetailsRef.current = sharedData?.ownerDetails;
    // console.log("ownerDetailsRef.current", ownerDetailsRef.current);
    setOwnerDetails(ownerDetailsRef.current);
  }, [sharedData, dispatch, isLoading]);

  console.log("OWN", sharedData);

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
          height: 'calc(100vh - 50px - 20px)'
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
            borderLeftColor: theme?.activeColor
          }}
        >
          <FaInfoCircle />
          Owner User Info
        </div>
        <Owner ownerDetails={ownerDetails!} />
      </div>
    </div>
  );
};

export default ShareEditor;
