import { IOwnerDetails } from "@/@types/share";
import CodePreview from "@/components/file/share/code-preview";
import UsersAvatar from "@/components/file/share/to-me/users-avatar";
import ViewButton from "@/components/file/share/view-btn";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { User } from "lucide-react";
import { useSelector } from "react-redux";

type RemainingType = {
  code: string;
  lang: string;
  sharedBy: IOwnerDetails;
  sharedId: string;
  createdAt: string;
};

const Remaining = ({
  code,
  lang,
  sharedBy,
  sharedId,
  createdAt,
}: RemainingType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className="w-full border my-1 p-2 rounded-md relative"
      style={{
        backgroundColor: theme.border5,
        borderColor: theme.border15,
      }}
    >
      <div
        className="border-l-2 pl-2"
        style={{
          borderLeftColor: theme.activeColor,
        }}
      >
        <CodePreview
          code={code}
          lang={lang}
          height="2rem"
          showLangBadge={false}
          editorWrapperClassName="px-0 py-1"
          editorFontSizeProp="10px"
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span
          className="text-[0.63rem] px-2 backdrop-blur-2xl  w-fit rounded-md"
          style={{
            backgroundColor: `${theme.activeColor}60`,
            color: theme.activeColor,
          }}
        >
          {lang}
        </span>
        <p
          className="text-xs backdrop-blur-2xl w-fit rounded-md"
          style={{
            // backgroundColor: `${theme.activeColor}`,
            color: theme.disabledTextColor,
          }}
        >
          {createdAt}
        </p>
      </div>
      <div className="pl-1 w-full my-2 flex items-end justify-between">
        <div>
          <div className={cn("flex items-center gap-2 mt-1 mb-0.5")}>
            <User size={11} style={{ color: theme.disabledTextColor }} />
            <span
              className="text-[0.6rem] font-medium"
              style={{ color: theme.disabledTextColor }}
            >
              Shared by
            </span>
          </div>
          <UsersAvatar
            sharedBy={sharedBy}
            avatarClassName="w-6 h-6"
            nameClassName="text-xs"
          />
        </div>
        <ViewButton
          isShareByMe
          sharedId={sharedId}
          linkClassName={cn("py-0 -translate-y-2")}
          variant="link"
        />
      </div>
    </div>
  );
};

export default Remaining;
