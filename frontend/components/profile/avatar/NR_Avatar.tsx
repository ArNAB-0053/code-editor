"use client";
import { useTheme } from "@/context/ThemeContext";
import { NRCAvatar, NRCButton } from "../../ui/no-redux";
import { useMyProfile } from "@/services/profile";
import { LuLoader } from "react-icons/lu";
import { fallbackAvatar, fallbackProfileDetails } from "@/constants/base.const";
import { AvatarTemplate } from "./avatar-template";
import { spaceGrotesk } from "@/fonts";
import { cn } from "@/lib/utils";
import { FiLogOut } from "react-icons/fi";
import { useFont } from "@/context/FontProvider";

export const NRAvatarDropdown = () => {
  const { data: profileDetails, isLoading } = useMyProfile();
  const { theme } = useTheme();
  const { font } = useFont();

  return (
    <>
      <AvatarTemplate
        dropdownContent={
          <a onClick={(e) => e.preventDefault()}>
            {!profileDetails?.nameObj && !isLoading ? (
              <NRCAvatar
                name={fallbackAvatar}
                className="border-1.5!"
                style={{
                  borderColor: theme.activeColor,
                  background: `${theme.activeColor}50`,
                }}
              />
            ) : profileDetails?.name && isLoading ? (
              <div className="w-9 aspect-square rounded-full flex items-center justify-center">
                <LuLoader className="animate-spin" color={theme.activeColor} />
              </div>
            ) : (
              <NRCAvatar
                name={profileDetails?.nameObj || fallbackAvatar}
                // variant="transparent"
                characters={1}
                className="border-1.5! "
                style={{
                  borderColor: theme.activeColor,
                  background: `${theme.activeColor}50`,
                }}
              />
            )}
          </a>
        }
        avatar={
          <NRCAvatar
            name={profileDetails?.nameObj || fallbackAvatar}
            variant="default"
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
        name={profileDetails?.name || fallbackProfileDetails?.name}
        email={profileDetails?.email || fallbackProfileDetails.email}
        username={profileDetails?.username || fallbackProfileDetails.username}
        theme={theme}
        font={font}
      />
    </>
  );
};
