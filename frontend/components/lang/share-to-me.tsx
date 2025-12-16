"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { IShareDataModel } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareToMeList } from "@/services/share";
import React from "react";
import { useSelector } from "react-redux";
import ACard from "../ui/antd/card";

const ShareToMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareToMeList(userId);

  console.log("[share] __share_to_me__ : ", data);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <div className="mb-8">
      <h3 className="mb-4 font-semibold relative pl-4">
        Shared To Me
        <div
          className="h-full w-1 absolute left-0 top-1/2 -translate-y-1/2"
          style={{ background: theme.activeColor }}
        />
      </h3>
      {/* {JSON.stringify(data)} */}

      {data?.length === 0 && (
        <p style={{ color: theme.disabledTextColor }}>
          No data found that shared to you.
        </p>
      )}

      <div className="flex items-center gap-3">
        {data?.map((x: IShareDataModel, i) => (
          <ACard key={i} title="main.py">
            lang: {x.lang}
            <br />
            code: {x.code}
            <br />
            output: {x.output}

            <h3 className="border-t mt-3">Owner</h3>
            {x.ownerDetails.username}
          </ACard>
        ))}
      </div>
    </div>
  );
};

export default ShareToMe;
