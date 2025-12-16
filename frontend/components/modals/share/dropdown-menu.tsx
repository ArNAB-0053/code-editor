import { SetterFunctionTypesBool } from "@/@types/_base";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { CDivider } from "@/components/ui/custom";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectWebsiteFont } from "@/redux/slices/preferenceSlice";
import { BiWorld } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";

type DropdownMenuType = {
  isPublic: boolean;
  setIsPublic: SetterFunctionTypesBool;
  theme: ThemeTypes;
};

export const ISPUBLIC_CONFIG = {
  FALSE: {
    icon: <FaLock size={16} />,
    title: "Restricted",
    description: "Only people with access can open with the link",
  },
  TRUE: {
    icon: <BiWorld size={16} />,
    title: "Anyone with the link",
    description: "Anyone on the internet with the link can view",
  },
};

const DropdownMenu = ({ isPublic, setIsPublic, theme }: DropdownMenuType) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <div className={cn("flex flex-col w-68", font?.className)}>
      <button
        className={cn(
          "text-xs ml-0.5 flex items-center gap-x-3 rounded-xl cursor-pointer pt-5 pb-4 px-5 transition-all duration-100 ease-linear group",
          !isPublic ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
        style={{
          color: theme.textColor,
          borderColor: isPublic ? theme.border : "transparent",
        }}
        onClick={() => setIsPublic(false)}
      >
        <span className="flex items-center gap-x-3">
          <div
            className="h-5 aspect-square rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: theme.textColor,
              opacity: isPublic ? 0 : 1,
            }}
          >
            <div
              className="rounded-full h-2 w-2"
              style={{
                background: theme.textColor,
              }}
            />
          </div>
          <h3 className="flex flex-col text-start text-sm font-semibold">
            {ISPUBLIC_CONFIG.FALSE.title}
            <span
              className={cn(
                "text-[0.7rem] leading-3 font-normal",
                isPublic ? "group-hover:opacity-85" : ""
              )}
              style={{
                color: isPublic ? theme.textColor : theme.disabledTextColor,
              }}
            >
              {ISPUBLIC_CONFIG.FALSE.description}
            </span>
          </h3>
        </span>
      </button>

      <CDivider className="mt-0! p-0! mb-0!" />

      <button
        className={cn(
          "text-xs ml-0.5 flex items-center gap-x-3 rounded-xl cursor-pointer pt-4 pb-5 px-5 transition-all duration-100 ease-linear group",
          isPublic ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
        style={{
          color: theme.textColor,
          borderColor: isPublic ? theme.border : "transparent",
        }}
        onClick={() => {
          setIsPublic(true);
        }}
      >
        <span className="flex items-center gap-x-3">
          <div
            className="h-5 w-5 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: theme.textColor,
              opacity: isPublic ? 1 : 0,
            }}
          >
            <div
              className="rounded-full h-2 w-2"
              style={{
                background: theme.textColor,
              }}
            />
          </div>
          <h3 className="flex flex-col text-start text-sm font-semibold">
            {ISPUBLIC_CONFIG.TRUE.title}
            <span
              className={cn(
                "text-[0.7rem] leading-3 font-normal",
                isPublic ? "" : "group-hover:opacity-85"
              )}
              style={{
                color: isPublic ? theme.disabledTextColor : theme.textColor,
              }}
            >
              {ISPUBLIC_CONFIG.TRUE.description}
            </span>
          </h3>
        </span>
      </button>
    </div>
  );
};

export default DropdownMenu;
