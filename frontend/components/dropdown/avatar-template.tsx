"use client";
import { Dropdown } from "antd";
import { appUrls } from "@/config/navigation.config";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLockReset } from "react-icons/md";
import { cn } from "@/lib/utils";
import { jetBrainsMono, spaceGrotesk } from "@/fonts";
import { ThemeTypes } from "@/@types/theme";
import { ReactNode } from "react";
import { NextFont } from "next/dist/compiled/@next/font";
import { fallbackProfileDetails } from "@/constants/base.const";
import { StyledButton, StyledDiv, StyledLink } from "@/styles/StyledComponents";
import { SetterFunctionTypesBool } from "@/@types/_base";
import { FaArrowRightLong } from "react-icons/fa6";
import { transitionString } from "@/styles";
import { ProviderTypeEnum, ProviderTypeEnumString } from "@/@types/_enums";
import { FiLogIn } from "react-icons/fi";

export interface ExtraProps {
  offset?: [number, number];
  isSider?: boolean;
  verticalLineClassName?: string;
  horizontalLineClassName?: string;
}

interface AvatarTemplateProps extends ExtraProps {
  userId: string;
  theme: ThemeTypes;
  font: NextFont;
  dropdownContent: ReactNode;
  avatar: ReactNode;
  logoutButton: ReactNode;
  name: string;
  email: string;
  username: string;
  onClick?: () => void;
  modalComponent?: ReactNode;
  provider?: ProviderTypeEnumString;
}

export const AvatarTemplate = ({
  userId,
  dropdownContent,
  avatar,
  logoutButton,
  name,
  email,
  theme,
  font,
  username,
  offset,
  isSider,
  verticalLineClassName,
  horizontalLineClassName,
  onClick,
  modalComponent,
  provider,
}: AvatarTemplateProps) => {
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
            font?.className,
          )}
          style={{ color: theme.textColor }}
        >
          <p
            className={cn(
              "text-xs px-2 pt-0 relative flex items-center justify-start gap-x-1 rounded-full",
              jetBrainsMono.className,
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

        {userId ? (
          <>
            <StyledLink
              $theme={theme}
              href={`${appUrls.PROFILE}/${username}`}
              style={{
                background: `${theme.textColor}10`,
                color: theme.textColor,
              }}
              className={cn(
                "flex items-center gap-x-2 mt-6 w-full py-2 px-4 rounded-md  relative group  transition-all ease-linear duration-200 overflow-hidden ",
                spaceGrotesk?.className,
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

            {provider === ProviderTypeEnumString.NORMAL && (
              <StyledButton
                $theme={theme}
                style={{
                  background: `${theme.textColor}10`,
                  color: theme.textColor,
                }}
                className={cn(
                  "flex items-center mt-3 w-full gap-x-2 py-2 px-4 group rounded-md  transition-all ease-linear duration-100 relative overflow-hidden cursor-pointer",
                  spaceGrotesk?.className,
                )}
                onClick={onClick}
              >
                <div
                  className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-200"
                  style={{
                    backgroundColor: `${theme.activeColor}30`,
                  }}
                />
                <MdOutlineLockReset />
                Change Password
              </StyledButton>
            )}

            <div className="text-white mt-6 w-full flex items-center justify-end">
              {logoutButton}
            </div>
          </>
        ) : (
          <>
            {/* <StyledLink
              $theme={theme}
              href={appUrls.REGISTER}
              style={{
                background: `${theme.textColor}10`,
                color: theme.textColor,
              }}
              className={cn(
                "flex items-center gap-x-2 mt-6 w-full py-2 px-4 rounded-md  relative group  transition-all ease-linear duration-200 overflow-hidden ",
                spaceGrotesk?.className,
              )}
            >
              <div
                className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-200"
                style={{
                  backgroundColor: `${theme.activeColor}30`,
                }}
              />
              <FiLogIn />
              Sign Up
              <FaArrowRightLong
                className={cn(
                  "group-hover:opacity-100 opacity-0 absolute right-10 group-hover:right-5 top-1/2 -translate-y-1/2",
                  transitionString,
                )}
              />
            </StyledLink> */}

            <StyledLink
              $theme={theme}
              href={appUrls.LOGIN}
              style={{
                // background: `${theme.textColor}10`,
                color: theme.textColor,
              }}
              className={cn(
                "flex items-center gap-x-2 mt-6 w-full py-2 px-4 rounded-md  relative group  transition-all ease-linear duration-200 overflow-hidden ",
                spaceGrotesk?.className,
              )}
            >
              {/* <div
                className="h-full w-full absolute -left-60 top-0 group-hover:left-0 transition-all ease-linear duration-200"
                style={{
                  backgroundColor: `${theme.activeColor}30`,
                }}
              /> */}
              <FiLogIn />
               Sign In
              <FaArrowRightLong
                className={cn(
                  "group-hover:opacity-100 opacity-0 absolute right-10 group-hover:right-5 top-1/2 -translate-y-1/2",
                  transitionString,
                )}
              />
            </StyledLink>
          </>
        )}
      </div>

      <div
        className={cn(
          "h-0.5 w-1/2 mt-4 rounded-l-2xl rounded-r-2xl opacity-90",
          isSider ? "place-self-start" : "place-self-center",
          horizontalLineClassName,
        )}
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

      {isSider && (
        <div
          className={cn(
            "h-8/10 w-0.5 place-self-center rounded-l-2xl rounded-r-2xl absolute left-0 bottom-4",
            verticalLineClassName,
          )}
          style={{
            backgroundColor: `${theme.activeColor}`,
          }}
        />
      )}
    </div>
  );

  return (
    <>
      <Dropdown
        trigger={["click"]}
        align={{
          offset,
        }}
        menu={{
          items: [
            {
              key: 1,
              label: dropdownElement(),
            },
          ],
        }}
        className="cursor-pointer "
        rootClassName=" backdrop-blur-xl rounded-xl p-0! "
        styles={{
          root: {
            backgroundColor: `${theme.activeColor}20`,
          },
        }}
      >
        {dropdownContent}
      </Dropdown>

      {modalComponent}
    </>
  );
};
