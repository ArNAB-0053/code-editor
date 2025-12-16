"use client";
import { IShareByMeRes } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareByMeList } from "@/services/share";
import { useSelector } from "react-redux";
import { CAvatar } from "../ui/custom";
import { cn } from "@/lib/utils";
import { MAX_SHARE_VISIBLE } from ".";
import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { HeaderTitle } from "./header-title";
import CodePreview from "./code-preview";
import EmptyShare from "./empty";

const ShareByMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareByMeList(userId);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  // const websiteFont = useSelector(selectWebsiteFont);
  // const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <div className="w-full">
      <HeaderTitle data={data as IShareByMeRes[]} title="Shared By Me" />

      {data?.length === 0 && (
        <EmptyShare
          title="No shared snippets yet"
          description="Share your code snippets with others to see them here"
        />
      )}

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
        {data?.map((x: IShareByMeRes, i) => {
          const len = x.sharedWith.length;
          const isRem = len > MAX_SHARE_VISIBLE;
          const rem = len - MAX_SHARE_VISIBLE;

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
                    <Users
                      size={14}
                      style={{ color: theme.disabledTextColor }}
                    />
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
                  <div className="flex items-center -space-x-2">
                    {isRem && (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ring-2 backdrop-blur-2xl"
                        style={{
                          background: `${theme.activeColor}50`,
                          color: theme.activeColor,
                          zIndex: MAX_SHARE_VISIBLE + 1,
                        }}
                      >
                        +{rem}
                      </div>
                    )}
                    {x.sharedWith.slice(0, MAX_SHARE_VISIBLE).map((u, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "relative ",
                          len === 1
                            ? "flex items-center justify-center gap-x-2 "
                            : ""
                        )}
                        style={{ zIndex: MAX_SHARE_VISIBLE - idx }}
                      >
                        <CAvatar
                          name={u.name}
                          characters={1}
                          className="w-8 h-8 text-xs font-semibold border-0 ring-2 backdrop-blur-2xl"
                          style={{
                            background:
                              idx == MAX_SHARE_VISIBLE - 1
                                ? `${theme.activeColor}65`
                                : `${theme.activeColor}50`,
                            color: theme.activeColor,
                          }}
                        />
                        {len === 1 && (
                          <span className="flex-1">
                            <p
                              style={{ color: theme.disabledTextColor }}
                              className="text-sm truncate max-w-28 overflow-hidden"
                            >
                              {getFullnameFromNameObj(x.sharedWith[0].name)}
                            </p>
                            <p
                              className="text-xs -translate-y-1 font-medium"
                              style={{ color: theme.activeColor }}
                            >
                              @{x.sharedWith[0].username}
                            </p>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* View Button */}
                  <Link
                    href={`/lang/${x.share.sharedId}`}
                    className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      color: theme.textColor,
                      backgroundColor: theme.activeColor,
                    }}
                  >
                    View
                    <ExternalLink
                      size={12}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </Link>
                </div>

                {/* Individual Username Display (for single share) */}
                {/* {len === 1 && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                    style={{
                      background: `${theme.activeColor}10`,
                      borderColor: `${theme.activeColor}20`,
                      borderWidth: "1px",
                    }}
                  >
                    <span style={{ color: theme.disabledTextColor }}>
                      Shared with:
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: theme.activeColor }}
                    >
                      @{x.sharedWith[0].username}
                    </span>
                  </div>
                )} */}
              </div>

              {/* Hover Effect Border */}
              {/* <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 0 2px ${theme.activeColor}40`,
                }}
              /> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShareByMe;
