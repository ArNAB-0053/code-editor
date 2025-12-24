"use client";
import { Tabs, TabsProps, theme } from "antd";
import FileComponent from "./file-component";
import ShareToMe from "./share/to-me";
import ShareByMe from "./share/by-me";
import { cn } from "@/lib/utils";
import { jetBrainsMono, websiteFonts } from "@/fonts";
import { IoGrid } from "react-icons/io5";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { WebsiteFontsKey } from "@/@types/font";
import { FaTrash } from "react-icons/fa";
import FolderCodeIcon from "@/assets/FolderCode";
import { ShareByMeIcon, ShareWithMeIcon } from "@/assets/ShareIcons";
import Trash from "./trash";
import { ReactElement, useState } from "react";
import { CDivider } from "../ui/custom";
import { themeConfig } from "@/config/themeConfig";
import { selectedActiveTabKey } from "@/redux/slices/activeTab";
import { RiLayoutGrid2Line } from "react-icons/ri";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { selectedUserId } from "@/redux/slices/userSlice";
import { IFilesListResponse } from "@/@types/files";
import { useFileListByUserId } from "@/services/files";

const StyledDiv = styled.div<{ $theme: ThemeTypes; $isActiveTab: boolean }>`
  &:hover {
    background: ${({ $theme, $isActiveTab }) =>
      $isActiveTab
        ? `${$theme.activeColor}`
        : `${$theme.activeColor}90`} !important;
  }

  background: ${({ $theme, $isActiveTab }) =>
    $isActiveTab ? $theme.activeColor : "transparent"} !important;
  color: ${({ $theme, $isActiveTab }) =>
    $isActiveTab ? $theme.textColor : $theme.disabledTextColor} !important;
`;

export const MAX_SHARE_VISIBLE = {
  TABLE: 8,
  CARD: 3,
  LIST: 2,
};

type TabLabelTemplateProps = {
  labelClassName?: string;
  rootClassName?: string;
  Icon: ReactElement;
  label: string;
  isActiveTab: boolean;
};

type DisabledItemTemplateProps = {
  labelClassName?: string;
  rootClassName?: string;
  label: string;
};

const TabLabelTemplate = ({
  labelClassName,
  rootClassName,
  Icon,
  label,
  isActiveTab,
}: TabLabelTemplateProps) => {
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <StyledDiv
      $isActiveTab={isActiveTab}
      $theme={theme}
      className={cn(
        "flex items-center gap-x-2 pl-5 pr-7 lg:px-6 py-1.5 lg:py-2.5 w-fit lg:w-[13rem] xl:w-[15rem] rounded-[6px]",
        rootClassName
      )}
    >
      {Icon}
      <p className={cn(font?.className, labelClassName)}>{label}</p>
    </StyledDiv>
  );
};

const DisabledItemTemplate = ({
  label,
  rootClassName,
  labelClassName,
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
      <span className={cn("pl-1", labelClassName)}>{label}</span>
      <CDivider
        style={{
          backgroundColor: theme.disabledTextColor,
        }}
        className="mt-1! mb-0! opacity-70"
      />
    </div>
  );
};

const FilesPage = () => {
  const userId = useSelector(selectedUserId);
  const activeTab = useSelector(selectedActiveTabKey);

  const [activeSiderTab, setActiveSiderTab] = useState("1");

  const payload = {
    OwnerId: userId,
    IsDeleted: false,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  const onChange = (key: string) => {
    setActiveSiderTab(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "group-files-1",
      label: <DisabledItemTemplate label="Files" labelClassName="uppercase" />,
      disabled: true,
    },
    {
      key: "1",
      label: (
        // Controlling the width of Tab from here by giving one 15rem
        <TabLabelTemplate
          Icon={
            activeTab === "1" ? (
              <IoGrid size={18} />
            ) : (
              <RiLayoutGrid2Line size={20} />
            )
          }
          label="All"
          labelClassName="translate-y-0.5 translate-x-0.5"
          isActiveTab={activeSiderTab === "1"}
        />
      ),
      children: (
        <div
          className="overflow-x-hidden overflow-y-auto custom-scrollbar pr-2 pl-3"
          style={{
            height: "calc(100svh - 120px)",
          }}
        >
          <FileComponent files={files as IFilesListResponse} isLoading={isLoading} />
          <ShareToMe />
          <ShareByMe />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <TabLabelTemplate
          Icon={<FolderCodeIcon size={20} />}
          label="Folders & Files"
          isActiveTab={activeSiderTab === "2"}
        />
      ),
      children: (
        <div
          className="overflow-x-hidden overflow-y-auto custom-scrollbar pr-2 pl-3"
          style={{
            height: "calc(100svh - 120px)",
          }}
        >
          <FileComponent files={files as IFilesListResponse} isLoading={isLoading} />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <TabLabelTemplate
          Icon={<ShareWithMeIcon size={20} />}
          label="Shared With Me"
          isActiveTab={activeSiderTab === "3"}
        />
      ),
      children: (
        <div
          className="overflow-x-hidden overflow-y-auto custom-scrollbar pr-2 pl-3"
          style={{
            height: "calc(100svh - 120px)",
          }}
        >
          <ShareToMe />,
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <TabLabelTemplate
          Icon={<ShareByMeIcon size={20} />}
          label="Shared By Me"
          isActiveTab={activeSiderTab === "4"}
        />
      ),
      children: (
        <div
          className="overflow-x-hidden overflow-y-auto custom-scrollbar pr-2 pl-3"
          style={{
            height: "calc(100svh - 120px)",
          }}
        >
          <ShareByMe />
        </div>
      ),
    },
    {
      key: "group-files-2",
      label: (
        <DisabledItemTemplate
          label="Recycle Bin"
          rootClassName="mt-6"
          labelClassName="uppercase"
        />
      ),
      disabled: true,
    },
    {
      key: "5",
      label: (
        <TabLabelTemplate
          Icon={<FaTrash className="-translate-y-0.5" />}
          label="Trash"
          isActiveTab={activeSiderTab === "5"}
        />
      ),
      children: (
        <div
          className="overflow-x-hidden overflow-y-auto custom-scrollbar pr-2 pl-3 "
          style={{
            height: "calc(100svh - 120px)",
          }}
        >
          <Trash />,
        </div>
      ),
    },
  ];

  return (
    <div className={cn("files", jetBrainsMono?.className)}>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default FilesPage;
