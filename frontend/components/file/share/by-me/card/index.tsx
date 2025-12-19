"use client";
import { IShareByMeRes } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { Users } from "lucide-react";
import { FC } from "react";
import UsersAvatar from "../users-avatar";
import ViewButton from "../../view-btn";
import { ShareByMeProps } from "@/@types/share";
import CodePreview from "../../code-preview";
import { MAX_SHARE_VISIBLE } from "@/components/file";

const ShareByMeCard: FC<ShareByMeProps> = ({ data }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  // const websiteFont = useSelector(selectWebsiteFont);
  // const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div
      className="
          grid
          grid-cols-1
          min-[640px]:grid-cols-2
          min-[700px]:grid-cols-2
          min-[950px]:grid-cols-3
          min-[1100px]:grid-cols-3
          min-[1250px]:grid-cols-4
          min-[1460px]:grid-cols-5
          gap-4
        "
    >
      {data?.map((x: IShareByMeRes, i) => {
        const len = x.sharedWith.length;
        const isRem = len > MAX_SHARE_VISIBLE.CARD;
        const rem = len - MAX_SHARE_VISIBLE.CARD;

        return (
          <div
            key={i}
            className="group relative rounded-xl overflow-hidden transition-all duration-300 "
            style={{
              backgroundColor: theme.editorBackground,
              borderColor: theme.border10,
              borderWidth: "2px",
            }}
          >
            <CodePreview code={x?.share?.code} lang={x?.share?.lang} />
            <div className="p-4 space-y-3">
              {/* Shared With Section */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={14} style={{ color: theme.disabledTextColor }} />
                  <span
                    className="text-xs font-medium"
                    style={{ color: theme.disabledTextColor }}
                  >
                    Shared with {len} {len === 1 ? "person" : "people"}
                  </span>
                </div>
              </div>

              {/* Avatar Group */}
              <div className="flex items-center justify-between">
                <UsersAvatar
                  sharedWith={x.sharedWith}
                  isRem={isRem}
                  len={len}
                  rem={rem}
                />

                <ViewButton isShareByMe sharedId={x.share.sharedId} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShareByMeCard;
