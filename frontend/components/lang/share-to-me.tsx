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
import {HeaderTitle} from "./header-title";
import EmptyShare from "./empty";
import CodePreview from "./code-preview";
import { ExternalLink, User } from "lucide-react";
import { CAvatar } from "../ui/custom";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import Link from "next/link";

const ShareToMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareToMeList(userId);

  console.log("[share] __share_to_me__ : ", data);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <div className="w-full mb-8">
      <HeaderTitle data={data} title="Shared With Me" />

      {data?.length === 0 && (
        <EmptyShare
          title="No shared snippets yet"
          description="Share your code snippets with others to see them here"
        />
      )}

      <div 
        className="
          grid
          grid-cols-1
          min-[640px]:grid-cols-2
          min-[700px]:grid-cols-2
          min-[950px]:grid-cols-3
          min-[1100px]:grid-cols-3
          min-[1300px]:grid-cols-4
          gap-4
        "
      >
        {data?.map((x: IShareDataModel, i) => (
          <div
            key={i}
            className="group relative rounded-xl overflow-hidden transition-all duration-300 "
            style={{
              backgroundColor: theme.editorBackground,
              borderColor: theme.border,
              borderWidth: "1.5px",
            }}
          >
            <CodePreview code={x.code} lang={x.lang} />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={14} style={{ color: theme.disabledTextColor }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: theme.disabledTextColor }}
                  >
                    Shared by
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="relative flex items-center justify-center gap-x-2 ">
                  <CAvatar
                    name={x.ownerDetails.name}
                    characters={1}
                    className="w-8 h-8 text-xs font-semibold ring-2 backdrop-blur-2xl"
                    style={{
                      background: `${theme.activeColor}50`,
                      color: theme.activeColor,
                      ringColor: theme.editorBackground,
                    }}
                  />
                  <span className="flex-1">
                    <div
                      style={{ color: theme.disabledTextColor }}
                      className="text-sm truncate max-w-28 overflow-hidden"
                    >
                      {getFullnameFromNameObj(x.ownerDetails.name)}
                    </div>
                    <p
                      className="text-xs -translate-y-1 font-medium"
                      style={{ color: theme.activeColor }}
                    >
                      @{x.ownerDetails.username}
                    </p>
                  </span>
                </div>

                <Link
                  href={`/lang/${x.sharedId}`}
                  className="group/btn flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 px-4 "
                  style={{
                    color: theme.textColor,
                    backgroundColor: theme.activeColor,
                  }}
                >
                  <p>View</p>
                  <ExternalLink
                    size={12}
                    className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareToMe;
