import { SetterFunctionTypesArray } from "@/@types/_base";
import { ThemeTypes } from "@/@types/theme";
import EmptyBox from "@/components/empty";
import { ASelect } from "@/components/ui/antd";
import { themeConfig } from "@/config/themeConfig";
import { useDebounce } from "@/hooks/useDebounce";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSearchByUsername } from "@/services/auth";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledASelect = styled(ASelect)<{ $theme: ThemeTypes }>`
  .ant-select-selection-overflow {
    padding: 3px 4px 6px 4px !important;
  }

  .ant-select-selection-wrap,
  .ant-select-selection-overflow-item,
  .ant-select-selection-item {
    height: 100% !important;
  }

  .ant-select-selection-item {
    background: ${({ $theme }) => $theme.border10} !important;
    padding-inline-start: 10px !important;
    padding-inline-end: 10px !important;
  }

  .ant-select-selection-item-remove svg {
    color: ${({ $theme }) => $theme.textColor} !important;
    margin: 0 0 0 2px;
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

const SearchUsername = ({
  setSearchItems,
}: {
  setSearchItems: SetterFunctionTypesArray;
}) => {
  const [searchItem, setSearchItem] = useState("");
  const debouncedSearchItem = useDebounce(searchItem, 1000);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const { data: usernames, isLoading } =
    useSearchByUsername(debouncedSearchItem);

  const options = usernames?.map((username: string) => ({
    label: username,
    value: username,
  }));

  return (
    <StyledASelect
      $theme={theme}
      mode="multiple"
      style={{ width: "100%", height: "50px", fontSize: "14px" }}
      className="mt-0!"
      placeholder="Search (usernames)"
      //   defaultValue={[]}
      onSearch={(value) => setSearchItem(value)}
      options={options}
      loading={isLoading}
      filterOption={false}
      notFoundContent={
        <div
          style={{ padding: "8px", opacity: 0.6 }}
          className="text-white text-center"
        >
          {searchItem == "" ? "Start typing for the result" : (

            <div className="flex items-center justify-center flex-col opacity-50">
              <EmptyBox/>
              No users found
            </div>
          )}
        </div>
      }
      onChange={(value) => setSearchItems(value)}
    />
  );
};

export default SearchUsername;
