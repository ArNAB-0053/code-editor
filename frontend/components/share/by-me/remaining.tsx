import { IUserDetails } from "@/@types/auth";
import { MAX_SHARE_VISIBLE } from "@/components/file";
import UsersAvatar from "@/components/file/share/by-me/users-avatar";
import CodePreview from "@/components/file/share/code-preview";
import ViewButton from "@/components/file/share/view-btn";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Users } from "lucide-react";
import { useSelector } from "react-redux";

type RemainingType = {
  code: string;
  lang: string;
  sharedWith: IUserDetails[];
  sharedId: string;
  createdAt: string;
};

const Remaining = ({
  code,
  lang,
  sharedWith,
  sharedId,
  createdAt,
}: RemainingType) => {
  const len = sharedWith?.length;
  const isRem = len > MAX_SHARE_VISIBLE.LIST;
  const rem = len - MAX_SHARE_VISIBLE.LIST;

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
          <div
            className={cn(
              "flex items-center gap-2 mt-1",
              len > 1 ? "mb-1" : ""
            )}
          >
            <Users size={11} style={{ color: theme.disabledTextColor }} />
            <span
              className="text-[0.6rem] font-medium"
              style={{ color: theme.disabledTextColor }}
            >
              Shared with {len} {len === 1 ? "person" : "people"}
            </span>
          </div>
          <UsersAvatar
            sharedWith={sharedWith}
            isRem={isRem}
            len={len}
            rem={rem}
            avatarClassName="w-6 h-6"
            nameClassName="text-xs"
          />
        </div>
        <ViewButton
          isShareByMe
          sharedId={sharedId}
          linkClassName={cn("py-0", len === 1 ? "-translate-y-2" : "")}
          variant="link"
        />
      </div>
    </div>
  );
};

export default Remaining;
