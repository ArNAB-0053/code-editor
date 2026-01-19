"use client";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import { appUrls } from "@/config/navigation.config";
import { themeConfig } from "@/config/themeConfig";
import { websiteFonts } from "@/fonts";
import { cn } from "@/lib/utils";
import { selectedActiveTabKey } from "@/redux/slices/activeTab";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { FolderCodeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { FaTrash } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { RiLayoutGrid2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CDivider } from "../ui/custom";
import { AllLangs } from "../lang";
import { FaArrowRightLong } from "react-icons/fa6";
import { transitionString } from "@/styles";

const StyledLink = styled(Link)<{ $theme: ThemeTypes; $isActiveTab: boolean }>`
  &:hover {
    background: ${({ $theme, $isActiveTab }) =>
      $isActiveTab
        ? `${$theme.activeColor}`
        : `${$theme.activeColor}90`} !important;
    color: ${({ $theme, $isActiveTab }) =>
      $isActiveTab ? "#fff" : $theme.textColor} !important;
  }

  background: ${({ $theme, $isActiveTab }) =>
    $isActiveTab ? $theme.activeColor : "transparent"} !important;
  color: ${({ $theme, $isActiveTab }) =>
    $isActiveTab ? "#fff" : $theme.disabledTextColor} !important;
`;

type TabLabelTemplateProps = {
  labelClassName?: string;
  rootClassName?: string;
  Icon: ReactElement;
  label: string;
  isActiveTab: boolean;
  link: string;
};

type DisabledItemTemplateProps = {
  labelClassName?: string;
  rootClassName?: string;
  label: string;
  isLink?: boolean;
  linkClassName?: string;
};

export const TabLabelTemplate = ({
  labelClassName,
  rootClassName,
  Icon,
  label,
  isActiveTab,
  link,
}: TabLabelTemplateProps) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <StyledLink
      href={link}
      $isActiveTab={isActiveTab}
      $theme={theme}
      className={cn(
        "flex items-center gap-x-2 px-4 xl:px-6 py-2 my-1.5 rounded-[6px]",
        rootClassName
      )}
    >
      {Icon}
      <p className={cn(font?.className, labelClassName, "text-sm")}>{label}</p>
    </StyledLink>
  );
};

const DisabledItemTemplate = ({
  label,
  rootClassName,
  labelClassName,
  isLink,
  linkClassName,
}: DisabledItemTemplateProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div
      className={cn(
        "text-xs font-semibold cursor-default disabled mb-2 w-full text-start",
        rootClassName
      )}
      style={{
        color: theme.disabledTextColor,
      }}
    >
      <span className={cn("pl-1", labelClassName)}>
        {label}
        {isLink && (
          <span
            className={cn(
              "text-[10px] px-1 py-0.5 rounded-full",
              linkClassName
            )}
            style={{
              backgroundColor: `${theme.activeColor}60`,
              color: theme.activeColor,
            }}
          >
            link
          </span>
        )}
      </span>
      <CDivider
        style={{
          backgroundColor: theme.disabledTextColor,
        }}
        className="mt-1! mb-0! opacity-70"
      />
    </div>
  );
};

const SideElements = {
  files: [
    {
      id: 1,
      href: appUrls.ALL,
      title: "All",
      icon: <FolderCodeIcon size={20} />,
    },
    {
      id: 2,
      href: appUrls.FILE,
      title: "Folders & Files",
      icon: <FolderCodeIcon size={20} />,
    },
    {
      id: 3,
      href: appUrls.SHARE.WITH_ME,
      title: "Shared With Me",
      icon: <ShareWithMeIcon size={20} />,
    },
    {
      id: 4,
      href: appUrls.SHARE.BY_ME,
      title: "Shared By Me",
      icon: <ShareByMeIcon size={20} />,
    },
  ],
  other: [
    {
      id: 5,
      href: appUrls.TRASH,
      title: "Trash",
      icon: <FaTrash className="-translate-y-0.5" />,
    },
  ],
};

const Sider = () => {
  const pathname = usePathname();
  const activeTab = useSelector(selectedActiveTabKey);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <div className=" w-50 min-[1100px]:w-[220px] xl:w-64 h-screen ">
      <DisabledItemTemplate label="Files" labelClassName="uppercase" />
      {SideElements?.files?.map((x, i) => (
        <TabLabelTemplate
          Icon={
            x.id === 1 ? (
              activeTab === "1" ? (
                <IoGrid size={18} />
              ) : (
                <RiLayoutGrid2Line size={20} />
              )
            ) : (
              <>{x.icon}</>
            )
          }
          label={x.title}
          labelClassName={cn(
            x.id === 1 ? "translate-y-0.5 translate-x-0.5" : "",
            pathname === x.href ? "font-medium" : ""
          )}
          isActiveTab={pathname === x.href}
          link={x.href}
          key={i}
        />
      ))}

      <div className="relative">
        <DisabledItemTemplate
          label="Langs"
          rootClassName="mt-6"
          labelClassName="uppercase"
          isLink
          linkClassName="text-[8.5px]"
        />

        <Link
          href={appUrls.LANG}
          className={cn(
            "absolute -top-1 right-0 py-0.5 px-2 rounded-md backdrop-blur-2xl text-xs flex items-center justify-center gap-x-1 opacity-80 hover:opacity-100",
            transitionString
          )}
          style={{
            background: `${theme.activeColor}50`,
            color: theme.activeColor,
          }}
        >
          Go
          <FaArrowRightLong size={12} />
        </Link>
      </div>

      <div className="px-4 xl:px-6 pt-2">
        <AllLangs dir="vertical" showArrow />
      </div>

      <DisabledItemTemplate
        label="Recycle Bin"
        rootClassName="mt-6"
        labelClassName="uppercase"
      />

      {SideElements?.other?.map((x, i) => (
        <TabLabelTemplate
          Icon={<>{x.icon}</>}
          label={x.title}
          isActiveTab={pathname === x.href}
          link={x.href}
          key={i}
        />
      ))}
    </div>
  );
};

export default Sider;
