import { appUrls } from "@/config/navigation.config";
import Link from "next/link";
import { CAvatar, CDivider } from "../ui/custom";
import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { jetBrainsMono, spaceGrotesk, websiteFonts } from "@/fonts";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { fallbackAvatar, fallbackProfileDetails } from "@/constants/base.const";
import { IOwnerDetails } from "@/@types/share";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { cn } from "@/lib/utils";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { EmptyContent } from "../empty";

const Owner = ({ ownerDetails }: { ownerDetails: IOwnerDetails }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const theme = themeConfig(editorTheme);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const fullname = getFullnameFromNameObj(ownerDetails?.name);

  return (
    <div
      className=" px-1 pt-1 relative w-full"
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
        className=" flex flex-col items-center gap-x-3 px-2 pt-5 pb-2 w-full"
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
        <CAvatar
          name={ownerDetails?.name || fallbackAvatar}
          variant="default"
          characters={1}
          className="border-2 w-18 h-18 text-2xl"
          style={{
            borderColor: theme.activeColor,
            background: `${theme.activeColor}50`,
          }}
        />

        <div
          className={cn(
            "flex flex-col justify-center items-center mt-3 w-full overflow-hidden ",
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
            {ownerDetails?.username || fallbackProfileDetails?.username}
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

          <Link
            href={appUrls.PROFILE}
            style={{
              //   background: `${theme.border10}`,
              color: theme.textColor,
              borderBottomColor: theme.activeColor,
            }}
            className={cn(
              "border-b flex items-center justify-center gap-x-2 mt-3 w-fit px-0.5 text-xs  relative group  transition-all ease-linear duration-200 overflow-hidden group hover:opacity-75 ",
              spaceGrotesk?.className
            )}
          >
            Go to Profile
            <FaArrowRightLong className="group-hover:translate-x-0.5 transition-all duration-200 ease-linear" />
          </Link>

          {/* <CDivider /> */}

          <p
            className="text-start mt-6 w-full font-semibold text-xs "
            style={{
              color: theme.disabledTextColor,
            }}
          >
            Personal Details
          </p>
          <CDivider className="mt-1 mb-0!" />
          <div className="w-full mt-2 flex items-center justify-between gap-x-2">
            <div
              className="h-8 w-8 flex items-center justify-center aspect-square rounded-xl "
              style={{
                background: theme.border15,
              }}
            >
              <FaUser />
            </div>
            <div className="flex-1 w-full ">
              <p
                className="text-xs font-semibold translate-y-0.5"
                style={{
                  color: theme.disabledTextColor,
                }}
              >
                Name:
              </p>
              <h3 className=" text-base font-normal -translate-y-0.5 truncate w-full text-nowrap ">
                {fullname || fallbackProfileDetails?.name}
              </h3>
            </div>
          </div>

          <div className="w-full mt-3 flex items-center justify-between gap-x-2">
            <div
              className="h-8 w-8 flex items-center justify-center aspect-square rounded-xl "
              style={{
                background: theme.border15,
              }}
            >
              <MdEmail />
            </div>
            <div className="flex-1 w-full translate-y-0.5">
              <p
                className="text-xs font-semibold"
                style={{
                  color: theme.disabledTextColor,
                }}
              >
                Email:
              </p>
              <h3
                className="text-base font-normal -translate-y-0.5"
                style={{
                  color: theme.textColor,
                }}
              >
                {ownerDetails?.email || fallbackProfileDetails?.email}
              </h3>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p
            className="text-start mt-6 w-full font-semibold text-xs "
            style={{
              color: theme.disabledTextColor,
            }}
          >
            Other Sharings
          </p>
          <CDivider className="mt-1 mb-4!" />

          {/* Just for the margin-top */}
          <div className="mt-20" />
          <EmptyContent
            title="No Data Found"
            boxClassName="opacity-50!"
            titleClassName="opacity-60!"
          />
        </div>
      </div>
    </div>
  );
};

export default Owner;
