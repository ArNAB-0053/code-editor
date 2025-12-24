"use client";
import { IShareDataModel } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme, selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import { FC } from "react";
import CodePreview from "../../code-preview";
import ViewButton from "../../view-btn";
import UsersAvatar from "../users-avatar";
import { ShareToMeProps } from "@/@types/share";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";

const ShareToMeCard: FC<ShareToMeProps> = ({ data }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div
      className="
          grid
          grid-cols-1
          min-[640px]:grid-cols-1
          min-[700px]:grid-cols-1
          min-[800px]:grid-cols-2
          min-[950px]:grid-cols-2
          min-[1100px]:grid-cols-3
          min-[1250px]:grid-cols-3
          min-[1460px]:grid-cols-4
          gap-4
        "
    >
      {data?.map((x: IShareDataModel, i) => (
        <div
          key={i}
          className={cn("group relative rounded-xl overflow-hidden transition-all duration-300 ", font?.className)}
          style={{
            backgroundColor: theme.editorBackground,
            borderColor: theme.border10,
            borderWidth: "2px",
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

            <div className={cn("flex items-center justify-between", font?.className)}>
              <UsersAvatar sharedBy={x.ownerDetails} />
              <ViewButton sharedId={x.sharedId} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShareToMeCard;
