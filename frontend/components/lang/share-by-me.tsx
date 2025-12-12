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
import { useShareByMeList } from "@/services/share";
import { useSelector } from "react-redux";

const ShareByMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareByMeList(userId);

  console.log("[share] __share_by_me__ : ", data);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div>
      <h3 className="mb-4 font-semibold relative pl-4">
        Shared By Me
        <div
          className="h-full w-1 absolute left-0 top-1/2 -translate-y-1/2"
          style={{ background: theme.activeColor }}
        />
      </h3>

      {data?.length === 0 && (
        <p style={{ color: theme.disabledTextColor }}>
          No data found that shared by you.
        </p>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {data?.map((x: IShareDataModel, i) => (
          <div key={i} className="bg-white/10 p-3 rounded-xl">
            lang: {x.lang}
            <br />
            code: {x.code}
            <br />
            output: {x.output}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShareByMe;
