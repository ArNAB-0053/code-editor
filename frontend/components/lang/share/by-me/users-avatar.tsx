import React from "react";
import { MAX_SHARE_VISIBLE } from "../..";
import { CAvatar } from "@/components/ui/custom";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { ExternalLink, Link } from "lucide-react";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import { IUserDetails } from "@/@types/auth";

type UsersAvatarProps = {
  len: number;
  isRem: boolean;
  rem: number;
  sharedWith: IUserDetails[];
  type?: "table" | "card";
  avatarClassName?: string;
  nameClassName?: string;
  usernameClassName?: string;
};

const UsersAvatar = ({
  len,
  isRem,
  rem,
  sharedWith,
  type = "card",
  avatarClassName,
  nameClassName,
  usernameClassName,
}: UsersAvatarProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const MAX_SHARE_VISIBLE_NUMBER =
    type === "card" ? MAX_SHARE_VISIBLE.CARD : MAX_SHARE_VISIBLE.TABLE;

  return (
    <div className="flex items-center -space-x-2">
      {sharedWith
        .slice(0, MAX_SHARE_VISIBLE_NUMBER)
        .map((u: IUserDetails, idx: number) => (
          <div
            key={idx}
            className={cn(
              "relative ",
              len === 1 ? "flex items-center justify-center gap-x-2 " : ""
            )}
            style={{ zIndex: idx }}
          >
            <CAvatar
              name={u.name}
              characters={1}
              className={cn(
                "w-8 h-8 text-xs font-semibold border-0 ring-2 backdrop-blur-2xl",
                avatarClassName
              )}
              style={{
                background:
                  idx === 0
                    ? `${theme.activeColor}65`
                    : `${theme.activeColor}50`,
                color: theme.activeColor,
              }}
            />
            {len === 1 && (
              <span className="flex-1">
                <p
                  style={{ color: theme.disabledTextColor }}
                  className={cn(
                    "text-sm truncate max-w-28 overflow-hidden",
                    nameClassName
                  )}
                >
                  {getFullnameFromNameObj(sharedWith[0].name)}
                </p>
                <p
                  className={cn(
                    "text-xs -translate-y-1 font-medium",
                    usernameClassName
                  )}
                  style={{ color: theme.activeColor }}
                >
                  @{sharedWith[0].username}
                </p>
              </span>
            )}
          </div>
        ))}
      {isRem && (
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ring-2 backdrop-blur-2xl",
            avatarClassName
          )}
          style={{
            background: `${theme.activeColor}50`,
            color: theme.activeColor,
            zIndex: MAX_SHARE_VISIBLE_NUMBER + 1,
          }}
        >
          +{rem}
        </div>
      )}
    </div>
  );
};

export default UsersAvatar;
