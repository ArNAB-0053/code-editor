"use client";

import { useSelector } from "react-redux";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";

import { themeConfig } from "@/config/themeConfig";

import { Dropdown } from "antd";
import { CDivider } from "../ui/custom";

import {  websiteFonts } from "@/fonts";
import { WebsiteFontsKey } from "@/@types/font";

import { codeLangHeaderFileBasedLinks, codeLangHeaderNormalLinks } from "@/helper/code-lang-header";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { transitionString } from "@/styles";
import { FaChevronRight } from "react-icons/fa";

const NavigationDropdown = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
  return (
    <Dropdown
      trigger={["click"]}
      align={{
        offset: [20, 0],
      }}
      menu={{
        items: [
          {
            key: 1,
            label: (
              <div
                key={1}
                className="flex justify-center flex-col w-[12rem] py-2 overflow-hidden border rounded-md bg-black/10"
                style={{
                  borderColor: theme.border,
                }}
              >
                {/* <p
                  className="uppercase text-[11px] font-semibold px-5 opacity-90"
                  style={{
                    color: theme.textColor,
                  }}
                >
                  File Links
                </p> */}
                {/* <CDivider className="mt-0.5! mb-1!" /> */}
                {codeLangHeaderFileBasedLinks?.map((link, i) => (
                  <>
                    <Link
                      key={i}
                      href={link?.link}
                      className={cn(
                        "opacity-80! transition-all! duration-200! ease-linear! ",
                      )}
                      style={{
                        color: theme?.textColor,
                      }}
                    >
                      <div
                        className={cn(
                          "w-full flex items-center gap-x-3  h-full px-7! py-1 hover:bg-white/20",
                          transitionString,
                        )}
                      >
                        <span className="h-4">{link?.icon}</span>
                        {link?.tooltip}
                      </div>
                    </Link>
                  </>
                ))}

                {/* <p
                  className="uppercase text-[11px] font-semibold px-5 opacity-90 mt-4"
                  style={{
                    color: theme.textColor,
                  }}
                >
                  Normal Links
                </p> */}
                <CDivider className="mt-0.5! mb-1!" />
                {codeLangHeaderNormalLinks?.map((link, i) => (
                  <>
                    <Link
                      key={i}
                      href={link?.link}
                      className={cn(
                        "opacity-80! transition-all! duration-200! ease-linear! ",
                      )}
                      style={{
                        color: theme?.textColor,
                      }}
                    >
                      <div
                        className={cn(
                          "w-full flex items-center gap-x-3  h-full px-7! py-1 hover:bg-white/20",
                          transitionString,
                        )}
                      >
                        <span className="h-4">{link?.icon}</span>
                        {link?.tooltip}
                      </div>
                    </Link>
                  </>
                ))}
              </div>
            ),
          },
        ],
      }}
      className="cursor-pointer "
      rootClassName="backdrop-blur-xl rounded-md p-0! "
      styles={{
        root: {
          backgroundColor: `${theme.border10}`,
        },
      }}
    >
      <span className={cn("flex items-center relative opacity-70 select-none gap-x-2 cursor-pointer hover:opacity-90", transitionString)}>
        <p
          className={cn(" text-sm tracking-tight select-none", font.className)}
        >
          Navigation
        </p>
        <FaChevronRight size={10} className={cn("opacity-100 rotate-90 ")} />
      </span>
    </Dropdown>
  );
};

export default NavigationDropdown;
