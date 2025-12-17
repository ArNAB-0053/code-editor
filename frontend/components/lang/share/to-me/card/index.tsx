"use client";
import { IShareDataModel } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { User } from "lucide-react";
import { FC } from "react";
import CodePreview from "../../code-preview";
import ViewButton from "../../view-btn";
import UsersAvatar from "../users-avatar";
import { ShareToMeProps } from "@/@types/share";

const ShareToMeCard: FC<ShareToMeProps> = ({ data }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
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

            <div className="flex items-center justify-between">
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
