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

const PageHeader = () => {
  const [open, setOpen] = useState(false);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  const theme = themeConfig(editorTheme);
  return (
    <>
      <div className="w-full flex items-center justify-between mb-2">
        <Logo/>

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
          <AvatarDropdown/>
        </div>
      </div>

      <PreferenceModal open={open} setOpen={setOpen} />
    </>
  );
};

export default PageHeader;