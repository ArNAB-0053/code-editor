"use client";
import { Dropdown } from "antd";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { ReactNode } from "react";
import { NextFont } from "next/dist/compiled/@next/font";
import { fallbackProfileDetails } from "@/constants/base.const";
import { PiUserFocusBold, PiUserFocusLight } from "react-icons/pi";

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

export const AvatarTemplate = ({
  dropdownContent,
  avatar,
  logoutButton,
  name,
  email,
  theme,
  font,
  username,
}: {
  dropdownContent: ReactNode;
  avatar: ReactNode;
  logoutButton: ReactNode;
  name: string;
  email: string;
  username: string;
  theme: ThemeTypes;
  font: NextFont;
}) => {
  const dropdownElement = () => (
    <div
      className=" px-1 pt-1 rounded-xl relative"
      style={{
        background: `linear-gradient(
                        to bottom,
                        ${theme.activeColor}30 0%,
                        ${theme.activeColor}10 30%,
                        rgba(255,255,255,0) 47%,
                        rgba(255,255,255,0) 100%
                      )`,
      }}
    >
      <div
        className=" flex flex-col items-center gap-x-3 w-[16rem] rounded-xl px-2 pt-5 pb-2"
        style={{
          background: `linear-gradient(
                        to bottom,
                        ${theme.background} 0%,
                        ${theme.activeColor}10 30%,
                        rgba(255,255,255,0) 47%,
                        rgba(255,255,255,0) 100%
                      )`,
        }}
      >
        {avatar}

        <span
          className={cn(
            "flex flex-col justify-center items-center mt-3 ",
            font?.className
          )}
          style={{ color: theme.textColor }}
        >
          <p
            className={cn(
              "text-xs px-2 pt-0 relative flex items-center justify-start gap-x-1 rounded-full",
              jetBrainsMono.className
            )}
            style={{
              background: `${theme.activeColor}50`,
              color: theme.textColor,
            }}
          >
            {/* <PiUserFocusLight size={16} color={theme?.activeColor} /> */}
            {username || fallbackProfileDetails?.username}
            {/* <div
              className="absolute left-0 bottom-0 w-full h-0.5 "
              style={{
                background: `${theme.activeColor}50`,
                // background: `linear-gradient(to right, ${theme.activeColor}80 20%, ${theme.activeColor}30 40%, transparent 100%  )`,
                // borderLeftColor: theme.activeColor,
                // borderRightColor: theme.activeColor
              }}
            /> */}
          </p>
          <h3 className="font-semibold text-base">
            {name || fallbackProfileDetails?.name}
          </h3>
          <p
            className="text-xs px-4 pb-0.5 rounded-full"
            style={{
              background: `${theme.textColor}20`,
              color: theme.textColor,
            }}
          >
            {email || fallbackProfileDetails?.email}
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
            className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-200"
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
            className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-200"
            style={{
              backgroundColor: `${theme.activeColor}30`,
            }}
          />
          <MdOutlineLockReset />
          Change Password
        </StyledDiv>

        <div className="text-white mt-6 w-full flex items-center justify-end">
          {logoutButton}
        </div>
      </div>

      <div
        className="h-0.5 w-1/2 mt-4 place-self-center rounded-l-2xl rounded-r-2xl opacity-90"
        style={{
          backgroundColor: `${theme.activeColor}`,
        }}
      />
      <div
        className="h-1 w-full place-self-center rounded-l-2xl rounded-r-2xl blur-[14px] opacity-90"
        style={{
          backgroundColor: `${theme.activeColor}`,
        }}
      />
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
        rootClassName="my-dropdown backdrop-blur-xl rounded-xl p-0! "
        overlayStyle={{
          backgroundColor: `${theme.activeColor}20`,
        }}
      >
        {dropdownContent}
      </Dropdown>
    </>
  );
};
