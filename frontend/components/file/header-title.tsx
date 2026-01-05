"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { IShareByMeRes, IShareDataModel } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { Code, Share2 } from "lucide-react";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

type HeaderTitleType = {
  data?: IShareDataModel[] | IShareByMeRes[] | null;
  title: string;
  Icon?: ReactElement | null;
  subTitle?: string | null;
};

export const HeaderTitle = ({
  data,
  title,
  Icon,
  subTitle,
}: HeaderTitleType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div className={cn("files flex items-center gap-3 ", font?.className)}>
      <div
        className="p-2 rounded-lg"
        style={{
          background: `${theme.activeColor}15`,
          borderColor: `${theme.activeColor}30`,
          borderWidth: "1px",
        }}
      >
        {Icon ? (
          Icon
        ) : (
          <Share2
            size={20}
            style={{ color: theme.activeColor }}
            strokeWidth={2.5}
          />
        )}
      </div>
      <div>
        <h3
          className="text-lg font-semibold"
          style={{ color: theme.textColor }}
        >
          {title}
        </h3>
        <p className="text-xs -mt-1" style={{ color: theme.disabledTextColor }}>
          {subTitle ? (
            subTitle
          ) : (
            <>
              {data?.length || 0} {data?.length === 1 ? "snippet" : "snippets"}{" "}
              shared
            </>
          )}
        </p>
      </div>
    </div>
  );
};
