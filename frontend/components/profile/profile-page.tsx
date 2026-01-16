import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { transitionString } from "@/styles";
import { FaUserEdit } from "react-icons/fa";
import { fallbackAvatar } from "@/constants/base.const";
import { useSelector } from "react-redux";
import { CAvatar } from "../ui/custom";
import { NameObjType } from "@/@types/_base";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { Heading, AInputWithLabel, Description } from "../_base/_base";

interface ProfileDetailsProps {
  firstName: string;
  middleName?: string;
  lastName: string;
  name: NameObjType;
  username: string;
  email: string;
}

const ProfileDetailsComponent = ({
  firstName,
  middleName,
  lastName,
  name,
  username,
  email,
}: ProfileDetailsProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const screenWidth = useScreenWidth();

  const fullName = getFullnameFromNameObj(name as NameObjType);
  return (
    <>
      <div className="w-full grid grid-cols-4 xl:grid-cols-5 gap-x-2 ">
        <div className="flex items-center gap-x-4 lg:gap-x-6 xl:gap-x-7 col-span-3 xl:col-span-4  ">
          <CAvatar
            name={name || fallbackAvatar}
            variant="default"
            characters={1}
            className="border-2 max-md:w-20 max-md:h-20 w-28 h-28 text-2xl backdrop-blur-[120px]!"
            style={{
              borderColor: theme.activeColor,
              background: `${theme.activeColor}50`,
            }}
          />

          <div
            style={{
              width:
                screenWidth < 768
                  ? "calc(100% - 96px)"
                  : screenWidth > 1280
                  ? "calc(100% - 156px)"
                  : "calc(100% - 136px)",
            }}
          >
            <span
              className="text-sm truncate"
              style={{
                color: theme.disabledTextColor,
              }}
            >
              @{username}
            </span>

            <h1 className="text-xl font-semibold text-white truncate w-full">
              {fullName}
            </h1>

            <p
              className="text-sm"
              style={{
                color: theme.disabledTextColor,
              }}
            >
              {email}
            </p>
          </div>
        </div>

        <div className={cn(" flex items-center justify-end gap-x-2 pb-6")}>
          <button
            className={cn(
              " rounded-md py-2 pl-3 pr-2 text-sm cursor-pointer hover:opacity-100 opacity-80 ",
              transitionString
            )}
            style={{
              backgroundColor: theme.border10,
              color: theme.textColor,
            }}
          >
            <FaUserEdit size={18} />
          </button>
          <button
            className={cn(
              " rounded-md px-3 py-1.5 text-sm text-white cursor-pointer hover:opacity-100 opacity-80",
              transitionString
            )}
            style={{
              backgroundColor: theme.activeColor,
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="mt-3">
        <Heading>Summary</Heading>
        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam amet
          voluptates possimus. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Vero doloribus autem provident, dicta facilis
          delectus repellat earum obcaecati impedit placeat.
        </Description>
      </div>
      <Heading className="mt-3">Profile Details</Heading>
      <div className="flex items-center justify-between gap-x-6">
        <AInputWithLabel
          value={firstName as string}
          label="First Name"
          disabled
        />
        <AInputWithLabel
          value={middleName as string}
          label="Middle Name"
          disabled
        />
        <AInputWithLabel
          value={lastName as string}
          label="Last Name"
          disabled
        />
      </div>
    </>
  );
};

export const ProfileDetails = memo(
  ProfileDetailsComponent,
  (prev, next) =>
    prev.email === next.email &&
    prev.username === next.username &&
    prev.firstName === next.firstName &&
    prev.middleName === next.middleName &&
    prev.lastName === next.lastName &&
    prev.name === next.name
);
