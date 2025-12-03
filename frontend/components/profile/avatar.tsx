"use client";
import { useTheme } from "@/context/ThemeContext";
import { NRCAvatar, NRCButton } from "../ui/no-redux";
import { useMyProfile } from "@/services/profile";
import { LuLoader } from "react-icons/lu";
import { Dropdown } from "antd";
import { useState } from "react";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { spaceGrotesk } from "@/fonts";
import { useFont } from "@/context/FontProvider";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";

const StyledLink = styled(Link)<{ $theme: ThemeTypes }>`
  &:hover {
    color: ${({ $theme }) => $theme.activeColor} !important;
  }
`;
const StyledDiv = styled.div<{ $theme: ThemeTypes }>`
  &:hover {
    color: ${({ $theme }) => $theme.activeColor} !important;
  }
`;

const Avatar = () => {
  const { data: profileDetails, isLoading } = useMyProfile();
  const { theme } = useTheme();
  const { font } = useFont();
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const dropdownElement = () => (
    <div className=" px-1 pt-1">
      <div
        className=" flex flex-col items-center gap-x-3 w-[16rem] rounded-xl px-2 pt-5 pb-2"
        style={{
          background: `linear-gradient(
                        to bottom,
                        #00000 0%,
                        ${theme.activeColor}10 30%,
                        rgba(255,255,255,0) 47%,
                        rgba(255,255,255,0) 100%
                      )`,
        }}
      >
        <NRCAvatar
          name={profileDetails?.name || "Guest"}
          variant="default"
          className="border-2 w-18 h-18 text-2xl"
          style={{
            borderColor: theme.activeColor,
            background: `${theme.activeColor}50`,
          }}
        />

        <span
          className={cn(
            "flex flex-col justify-center items-center mt-3 ",
            font.className
          )}
          style={{ color: theme.textColor }}
        >
          <h3 className="font-semibold text-base">
            {profileDetails?.name || "Guest"}
          </h3>
          <p
            className="text-xs px-4 pb-0.5 rounded-full"
            style={{
              background: `${theme.textColor}20`,
              color: theme.textColor,
            }}
          >
            {profileDetails?.email || "guest@example.com"}
          </p>
        </span>

        <StyledLink
          $theme={theme}
          href={appUrls.PROFILE}
          style={{
            background: `${theme.textColor}10`,
            color: theme.textColor,
          }}
          className={cn(
            "flex items-center gap-x-2 mt-6 w-full py-2 px-4 rounded-md  relative group  transition-all ease-linear duration-200 overflow-hidden ",
            spaceGrotesk?.className
          )}
        >
          <div
            className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-250"
            style={{
              backgroundColor: `${theme.activeColor}30`,
            }}
          />
          <FaUserCircle />
          Profile
        </StyledLink>

        <StyledDiv
          $theme={theme}
          style={{
            background: `${theme.textColor}10`,
            color: theme.textColor,
          }}
          className={cn(
            "flex items-center mt-3 w-full gap-x-2 py-2 px-4 group rounded-md  transition-all ease-linear duration-100 relative overflow-hidden",
            spaceGrotesk?.className
          )}
        >
          <div
            className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-250"
            style={{
              backgroundColor: `${theme.activeColor}30`,
            }}
          />
          <MdOutlineLockReset />
          Change Password
        </StyledDiv>

        <div
          onClick={hide}
          className="text-white mt-6 w-full flex items-center justify-end"
        >
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
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: 1,
              label: dropdownElement(),
            },
          ],
        }}
        className="cursor-pointer "
        rootClassName="my-dropdown backdrop-blur-xl rounded-xl"
        overlayStyle={{
          backgroundColor: `${theme.activeColor}20`,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          {!profileDetails?.name && !isLoading ? (
            <NRCAvatar
              name="Guest"
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
              name={profileDetails?.name || "Guest"}
              // variant="transparent"
              className="border-1.5!"
              style={{
                borderColor: theme.activeColor,
                background: `${theme.activeColor}50`,
              }}
            />
          )}
        </a>
      </Dropdown>
    </>
  );
};

export default Avatar;
