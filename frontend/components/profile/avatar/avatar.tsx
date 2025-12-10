"use client";
import { NRCAvatar, NRCButton } from "../../ui/no-redux";
import { useMyProfile } from "@/services/profile";
import { LuLoader } from "react-icons/lu";
import { fallbackAvatar, fallbackProfileDetails } from "@/constants/base.const";
import { AvatarTemplate } from "./avatar-template";
import { spaceGrotesk, websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { selectedUserEmail, selectedUserName } from "@/redux/slices/userSlice";
import { getFullnameFromNameObj } from "@/helper/_base.helper";

export const AvatarDropdown = () => {
  // const { data: profileDetails, isLoading } = useMyProfile();
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const nameObj = useSelector(selectedUserName);
  const email = useSelector(selectedUserEmail);

  const fullname = getFullnameFromNameObj(nameObj);
  console.log("nameObj", fullname);

  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <>
      <AvatarTemplate
        dropdownContent={
          <a onClick={(e) => e.preventDefault()}>
            <NRCAvatar
              name={nameObj || fallbackAvatar}
              className="border-1.5!"
              characters={1}
              style={{
                borderColor: theme.activeColor,
                background: `${theme.activeColor}50`,
              }}
            />
          </a>
        }
        avatar={
          <NRCAvatar
            name={nameObj || fallbackAvatar}
            variant="default"
            characters={1}
            className="border-2 w-18 h-18 text-2xl"
            style={{
              borderColor: theme.activeColor,
              background: `${theme.activeColor}50`,
            }}
          />
        }
        logoutButton={
          <NRCButton
            type="none"
            className={cn(
              "flex! items-center justify-center gap-x-2 text-[#ff4d4f]! bg-[#ff4d4f]/20! hover:opacity-70 transition-all ease-linear duration-100 font-semibold",
              spaceGrotesk.className
            )}
            // style={{
            //   background: `${theme.activeColor}20`,
            // }}
          >
            <FiLogOut />
            Log out
          </NRCButton>
        }
        name={fullname || fallbackProfileDetails?.name}
        email={email || fallbackProfileDetails.email}
        theme={theme}
        font={font}
      />
    </>
  );
};
