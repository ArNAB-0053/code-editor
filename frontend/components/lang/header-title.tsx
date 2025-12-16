"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { Code, Share2 } from "lucide-react";
import { useSelector } from "react-redux";

type HeaderTitleType = {
  data: any[];
  title: string;
};

export const HeaderTitle = ({ data, title }: HeaderTitleType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{
            background: `${theme.activeColor}15`,
            borderColor: `${theme.activeColor}30`,
            borderWidth: "1px",
          }}
        >
          <Share2
            size={20}
            style={{ color: theme.activeColor }}
            strokeWidth={2.5}
          />
        </div>
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: theme.textColor }}
          >
            {title}
          </h3>
          <p
            className="text-xs -mt-1"
            style={{ color: theme.disabledTextColor }}
          >
            {data?.length || 0} {data?.length === 1 ? "snippet" : "snippets"}{" "}
            shared
          </p>
        </div>
      </div>
    </div>
  );
};

export const HeaderLangTitle = ({ title }: { title: string }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{
            background: `${theme.activeColor}15`,
            borderColor: `${theme.activeColor}30`,
            borderWidth: "1px",
          }}
        >
          <Code
            size={20}
            style={{ color: theme.activeColor }}
            strokeWidth={2.5}
          />
        </div>
        <div>
          <h3
            className="text-lg font-semibold"
            style={{ color: theme.textColor }}
          >
            {title}
          </h3>
          <p
            className="text-xs -mt-1"
            style={{ color: theme.disabledTextColor }}
          >
            shared
          </p>
        </div>
      </div>
    </div>
  );
};
