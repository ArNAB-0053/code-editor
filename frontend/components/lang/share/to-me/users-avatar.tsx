import { CAvatar } from "@/components/ui/custom";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { IOwnerDetails } from "@/@types/share";
import { cn } from "@/lib/utils";

type UsersAvatarProps = {
  sharedBy: IOwnerDetails;
  avatarClassName?: string;
  nameClassName?: string;
  usernameClassName?: string;
};

const UsersAvatar = ({
  sharedBy,
  avatarClassName,
  nameClassName,
  usernameClassName,
}: UsersAvatarProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className="flex items-center -space-x-2">
      {sharedBy && (
        <div className="relative flex items-center justify-center gap-x-2 ">
          <CAvatar
            name={sharedBy.name}
            characters={1}
            className={cn(
              "w-8 h-8 text-xs font-semibold border-0 ring-2 backdrop-blur-2xl",
              avatarClassName
            )}
            style={{
              background: `${theme.activeColor}50`,
              color: theme.activeColor,
            }}
          />
          <span className="flex-1">
            <p
              style={{ color: theme.disabledTextColor }}
              className={cn(
                "text-sm truncate max-w-28 overflow-hidden",
                nameClassName
              )}
            >
              {getFullnameFromNameObj(sharedBy.name)}
            </p>
            <p
              className={cn(
                "text-xs -translate-y-1 font-medium",
                usernameClassName
              )}
              style={{ color: theme.activeColor }}
            >
              @{sharedBy.username}
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default UsersAvatar;
