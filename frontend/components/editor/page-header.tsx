import { useState } from "react";
import { themeConfig } from "@/config/themeConfig";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";
import { FaSlidersH } from "react-icons/fa";
import { AButton } from "../ui/antd";
import Logo from "../Logo";
import PreferenceModal from "../modals/preference";
import { AvatarDropdown } from "../profile/avatar";
import { LayoutHorizontalIcon, LayoutVerticalIcon } from "@/assets/LayoutIcons";
import {
  selectEditorLayout,
  setEditorLayout,
} from "@/redux/slices/editorLayout";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";

const PageHeader = () => {
  const [open, setOpen] = useState(false);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const layout = useSelector(selectEditorLayout);

  const dispatch = useDispatch();

  const theme = themeConfig(editorTheme);
  return (
    <>
      <div className="w-full flex items-center justify-between mb-2">
        <Logo />

        <div
          className={`flex items-center justify-end gap-x-3 ${
            websiteFonts[websiteFont as WebsiteFontsKey]?.className
          }`}
        >
          {/* <div
            className="flex items-center justify-center rounded-md opacity-90"
            style={{
              // backgroundColor: `${theme.activeColor}80`,
              color: theme.textColor,
            }}
          >
            <button
              className={cn(
                "w-full h-full px-1.5 py-1 cursor-pointer group rounded-md relative overflow-hidden ",
                transitionString
              )}
              onClick={() =>
                dispatch(
                  setEditorLayout(
                    layout === "vertical" ? "horizontal" : "vertical"
                  )
                )
              }
              style={{
                color: theme.activeColor
              }}
            >
              {layout === "vertical" ? (
                <LayoutHorizontalIcon />
              ) : (
                <LayoutVerticalIcon />
              )}

              <div
                className={cn(
                  "absolute left-0 top-0 w-full h-full -z-10 opacity-0 group-hover:opacity-40",
                  transitionString
                )}
                style={{ background: theme.activeColor }}
              />
            </button>
          </div> */}

          <AButton
            btntype="sameBg"
            onClick={() => setOpen(true)}
            style={{
              color: theme.activeColor,
              // border: `2px solid ${theme.activeColor}`,
            }}
            className="flex h-8! pl-1! pr-3! items-center text-xs! gap-2 rounded-3xl! cursor-pointer"
          >
            <div
              className="rounded-full p-1.5 text-white "
              style={{ background: `${theme.activeColor}` }}
            >
              <FaSlidersH size={10} />
            </div>
            Preference
          </AButton>
          <AvatarDropdown />
        </div>
      </div>

      <PreferenceModal open={open} setOpen={setOpen} />
    </>
  );
};

export default PageHeader;
