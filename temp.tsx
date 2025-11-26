"use client";
import React from "react";
import { Table, Tag } from "antd";
import NRATable from "@/components/ui/no-redux/table";
import styled from "styled-components";
import { ThemeTypes } from "@/@types/theme";
import { useCookieItems, useCookieTheme } from "@/hooks/useItemFromCookie";
import { FaCheck, FaCross } from "react-icons/fa";
import { RxCheck, RxCross2 } from "react-icons/rx";

const StyledTable = styled(Table)<{ $theme: ThemeTypes; $font: any }>`
  .ant-table-cell {
    color: ${({ $theme }) => $theme?.textColor} !important;
    background: ${({ $theme }) => $theme?.editorBackground} !important;
    border-bottom: 1px solid ${({ $theme }) => $theme?.border15} !important;
    border-left: none !important;
    border-right: none !important;
  }
  .ant-table-row:last-child .ant-table-cell {
    border-bottom: none !important;
  }
  .ant-table-cell:before {
    color: ${({ $theme }) => $theme?.textColor} !important;
    background: transparent !important;
  }
  .ant-table-thead > tr > th,
  .ant-table-cell,
  .ant-tag.ant-tag-red,
  .ant-tag.ant-tag-green {
    font-family: ${({ $font }) => $font?.style?.fontFamily} !important;
  }
`;

const Page = () => {
  const { theme, font } = useCookieItems();
  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: "Guest",
      dataIndex: "guest",
      key: "guest",
      align: "center",
      render: (value: boolean) =>
        value ? (
          <RxCheck size={18} className="place-self-center text-green-500 stroke-[1px]" />
        ) : (
          <RxCross2 size={18} className="place-self-center text-red-600 stroke-[1px]" />
        ),
    },
    {
      title: "Logged In",
      dataIndex: "user",
      key: "user",
      align: "center",
      render: (value: boolean) =>
        value ? (
          <RxCheck size={18} className="place-self-center text-green-500 stroke-[1px]" />
        ) : (
          <RxCross2 size={18} className="place-self-center text-red-600 stroke-[1px]" />
        ),
    },
  ];

  const data = [
    { key: 1, feature: "Database support", guest: false, user: true },
    { key: 2, feature: "File creation", guest: false, user: true },
    { key: 3, feature: "Multiple code saving", guest: false, user: true },
    { key: 4, feature: "Code runner", guest: true, user: true },
    { key: 5, feature: "Terminal support", guest: false, user: true },

    // Extra useful features
    { key: 6, feature: "Theme customization", guest: false, user: true },
    { key: 7, feature: "Cloud sync", guest: false, user: true },
    { key: 8, feature: "Collaboration (Live Share)", guest: false, user: true },
    { key: 9, feature: "Export code", guest: true, user: true },
    { key: 10, feature: "Editor autosave", guest: false, user: true },
    { key: 11, feature: "Snippets support", guest: false, user: true },
  ];

  console.log("dgysfgds ", font);
  console.log("dgysfgds ", font?.style?.fontFamily);

  return (
    <div className="p-10">
      <StyledTable
        style={{
          fontFamily: font?.style?.fontFamily,
        }}
        className={font?.style?.fontFamily}
        $theme={theme}
        $font={font}
        columns={columns}
        dataSource={data}
        // bordered
        pagination={false}
        // title={() => (
        //   <h2
        //     style={{
        //       fontFamily: font?.style?.fontFamily,
        //     }}
        //     className="text-xl font-semibold text-center"
        //   >
        //     Feature Comparison: Guest vs Logged In
        //   </h2>
        // )}
      />
    </div>
  );
};

export default Page;
