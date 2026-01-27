"use client";
import { fallbackAvatar, fallbackProfileDetails } from "@/constants/base.const";
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
import {
  selectedUserEmail,
  selectedUserId,
  selectedUserName,
  selectedUserProvider,
  selectedUserUsername,
  setUserEmpty,
} from "@/redux/slices/userSlice";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { CAvatar, CButton } from "@/components/ui/custom";
import { transitionString } from "@/styles";
import {
  AvatarTemplate,
  ExtraProps,
} from "@/components/dropdown/avatar-template";
import { useState } from "react";
import { ChangedPasswordModal } from "@/components/modals/change-password/R";
import { useLogout } from "@/services/auth";
import { useDispatch } from "react-redux";

interface AvatarDropdownProps extends ExtraProps {
  color?: string;
  background?: string;
  borderColor?: string;
}

export const AvatarDropdown = ({
  offset,
  color,
  background,
  borderColor,
  ...rest
}: AvatarDropdownProps) => {
  // const { data: profileDetails, isLoading } = useMyProfile();
  const [open, setOpen] = useState(false);

  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const nameObj = useSelector(selectedUserName);
  const email = useSelector(selectedUserEmail);
  const username = useSelector(selectedUserUsername);
  const userId = useSelector(selectedUserId);
  const provider = useSelector(selectedUserProvider);

  const dispatch = useDispatch();

  const fullname = getFullnameFromNameObj(nameObj);
  // console.log("nameObj", fullname);

  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    const res = await logout();
    if ((res.status = "success")) {
      dispatch(setUserEmpty());
    }
  };

  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  return (
    <>
      <AvatarTemplate
        provider={provider}
        userId={userId}
        offset={offset}
        {...rest}
        dropdownContent={
          <a onClick={(e) => e.preventDefault()}>
            <CAvatar
              name={nameObj || fallbackAvatar}
              className={cn("border-1.5! hover:opacity-90", transitionString)}
              characters={1}
              style={{
                borderColor: borderColor ? borderColor : theme.activeColor,
                background: background ? background : `${theme.activeColor}50`,
                color: color ? color : theme.activeColor,
              }}
            />
          </a>
        }
        avatar={
          <CAvatar
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
          <CButton
            type="none"
            className={cn(
              "flex! items-center justify-center gap-x-2 text-[#ff4d4f]! bg-[#ff4d4f]/20! hover:opacity-70 transition-all ease-linear duration-100 font-semibold",
              spaceGrotesk.className,
            )}
            onClick={handleLogout}
            // style={{
            //   background: `${theme.activeColor}20`,
            // }}
          >
            <FiLogOut />
            Log out
          </CButton>
        }
        name={fullname || fallbackProfileDetails?.name}
        email={email || fallbackProfileDetails.email}
        username={username || fallbackProfileDetails?.username}
        theme={theme}
        font={font}
        onClick={() => setOpen(true)}
        modalComponent={<ChangedPasswordModal open={open} setOpen={setOpen} />}
      />
    </>
  );
};
