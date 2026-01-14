import { useState } from "react";
import { themeConfig } from "@/config/themeConfig";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { asap, exo, lora, sora, spaceGrotesk, websiteFonts } from "@/fonts";
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
import getFileRelatedLinks from "@/helper/file-related-links";
import ATooltip from "../ui/antd/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appUrls } from "@/config/navigation.config";

const PageHeader = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  const fileRelatedLinks = getFileRelatedLinks({ size: 20 });

  const theme = themeConfig(editorTheme);

  const cantShowLinksPages = [
    appUrls.ALL,
    appUrls.FILE,
    appUrls.TRASH,
    appUrls.SHARE.BY_ME,
    appUrls.SHARE.WITH_ME,
  ];

  const showLinks = !cantShowLinksPages.includes(pathname);

  return (
    <>
      <div className="w-full flex items-center justify-between mb-2">
        <Logo />
        {showLinks && (
          <div
            className="flex overflow-hidden rounded-full "
            style={{
              backgroundColor: `${theme.border10}`,
              borderColor: theme.border15,
            }}
          >
            {fileRelatedLinks.map((x, i) => (
              <ATooltip
                key={i}
                placement="bottom"
                title={x.tooltip}
                color={`${theme.activeColor}90`}
              >
                <Link href={x.link}>
                  <div
                    className={cn(
                      "flex px-4 py-2 items-center gap-x-1 text-xs group hover:bg-white/10 relative  ",
                      transitionString
                    )}
                  >
                    <span
                      className={cn(
                        "opacity-80 group-hover:opacity-100 scale-85 group-hover:scale-95",
                        transitionString
                      )}
                    >
                      {x.icon}
                    </span>

                    {i !== fileRelatedLinks.length - 1 && (
                      <div
                        className="h-6 w-px absolute right-0 top-1/2 -translate-y-1/2"
                        style={{ backgroundColor: theme.border20 }}
                      />
                    )}
                  </div>
                </Link>
              </ATooltip>
            ))}
          </div>
        )}

        <div
          className={`flex items-center justify-end gap-x-3 ${
            websiteFonts[websiteFont as WebsiteFontsKey]?.className
          }`}
        >
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
