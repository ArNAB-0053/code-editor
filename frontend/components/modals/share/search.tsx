import { SetterFunctionTypesArray } from "@/@types/_base";
import { ISearchResultEach } from "@/@types/auth";
import { WebsiteFontsKey } from "@/@types/font";
import { ThemeTypes } from "@/@types/theme";
import { EmptyBox, EmptyContent } from "@/components/empty";
import { ASelect } from "@/components/ui/antd";
import { CAvatar } from "@/components/ui/custom";
import { themeConfig } from "@/config/themeConfig";
import { fallbackAvatar } from "@/constants/base.const";
import { websiteFonts } from "@/fonts";
import { getFullnameFromNameObj } from "@/helper/_base.helper";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSearchByUsername } from "@/services/auth";
import { Tag } from "antd";
import { NextFont } from "next/dist/compiled/@next/font";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledASelect = styled(ASelect)<{ $theme: ThemeTypes }>`
  .ant-select-selection-overflow {
    padding: 3px 2px 3px 2px !important;
  }

  // .ant-select-selection-wrap,
  .ant-select-selection-overflow-item,
  .ant-select-selection-item {
    height: 28px !important;
  }

  .ant-select-selection-item {
    background: ${({ $theme }) => $theme.activeColor} !important;
    padding-inline-start: 5px !important;
    padding-inline-end: 5px !important;
  }

  .anticon-close {
    color: ${({ $theme }) => $theme.textColor} !important;
    margin: 0 0 0 5px !important;
  }

  .ant-select-selection-item-content {
    display: flex !important;
    align-items: center !important;
  }

  .ant-select-selection-placeholder {
    font-size: 14px;
    margin-left: 3px;
    color: ${({ $theme }) => $theme.textColor}50 !important;
  }

  .ant-select-selection-item {
    color: ${({ $theme }) => $theme.textColor} !important;
  }

  .ant-select-selection-wrap {
    align-self: center !important;
  }

  //   .ant-select-selection-item {
  //     border-radius: 50px !important;
  //   }
`;

const createTagRender = (theme: ThemeTypes, font: NextFont) => {
  const Component = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    // const parsedLabel =
    //   label && typeof label === "string" && JSON?.parse(label ?? "");

    // let parsedLabel = ""

    // if(label && typeof label === "string") parsedLabel = JSON?.parse(label)

    console.log("___label___", label);

    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className={cn(
          " flex! items-center! justify-center! h-full! gap-x-2! mr-1! text-xs! px-1! ",
          font?.className
        )}
        style={{
          marginInlineEnd: 4,
          backgroundColor: theme?.border10,
          // borderColor: theme?.border10,
        }}
      >
        <CAvatar
          type="string"
          initials={label && label[0]}
          variant="default"
          characters={1}
          className="border-[2.2px]! w-5 h-5 text-[10px]!  "
          style={{
            borderColor: theme?.border20,
            background: `${theme?.border10}`,
            color: theme?.textColor,
          }}
        />
        {label}
      </Tag>
    );
  };

  Component.displayName = "SelectTagRenderer";

  return Component;
};

const SearchUsername = ({
  setSearchItems,
}: {
  setSearchItems: SetterFunctionTypesArray;
}) => {
  const [searchItem, setSearchItem] = useState("");
  const debouncedSearchItem = useDebounce(searchItem, 1000);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const { data: searchResults, isLoading } =
    useSearchByUsername(debouncedSearchItem);

  const options = searchResults?.map((searchResult: ISearchResultEach) => ({
    label: getFullnameFromNameObj(searchResult?.name),
    value: searchResult?.userId,
    name: searchResult.name,
    email: searchResult.email,
    userId: searchResult.userId,
    username: searchResult.username,
    data: searchResult,
  }));

  return (
    <StyledASelect
      $theme={theme}
      tagRender={createTagRender(theme, font)}
      mode="multiple"
      style={{ width: "100%", minHeight: "50px", fontSize: "14px" }}
      className="mt-0!"
      placeholder="Search people to share your code"
      //   defaultValue={[]}
      onSearch={(value) => {
        setSearchItem(value);
      }}
      options={options}
      optionRender={(option: any) => {
        const data: ISearchResultEach = option.data;
        return (
          <>
            <div className="flex items-center gap-3 px-3 py-2">
              <CAvatar
                name={data.name || fallbackAvatar}
                variant="default"
                characters={1}
                className="border-2 w-10 h-10 text-base "
                style={{
                  borderColor: theme.border20,
                  background: `${theme.border10}`,
                  color: theme.textColor,
                }}
              />
              <div className="flex flex-col">
                <span
                  className="px-2 py-0.5 text-xs rounded-md w-fit brightness-110"
                  style={{
                    background: theme.border20,
                    color: theme.textColor,
                  }}
                >
                  @{data.username}
                </span>
                <span className="text-xs opacity-70">
                  {getFullnameFromNameObj(data.name)}
                </span>
              </div>
            </div>
          </>
        );
      }}
      loading={isLoading}
      filterOption={false}
      notFoundContent={
        <div
          style={{ padding: "8px", opacity: 0.6 }}
          className="text-white text-center rounded-xl"
        >
          {searchItem == "" ? (
            // <EmptyContent title="Start typing for the result" />
            "Start typing for the result"
          ) : (
            <EmptyContent title="No users found" />
          )}
        </div>
      }
      onChange={(value) => {
        setSearchItems(value);
      }}
    />
  );
};

export default SearchUsername;
