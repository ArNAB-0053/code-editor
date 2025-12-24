import { TableProps, Tag } from "antd";
import { FC, useMemo } from "react";
import CodePreview from "../../code-preview";
import ViewButton from "../../view-btn";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import UsersAvatar from "../users-avatar";
import { ColumnsType } from "antd/es/table";
import { StyledATable } from "@/styles/StyledATable";
import { EmptyContent } from "@/components/empty";
import { ShareToMeProps, ShareToMeDataType } from "@/@types/share";

const ShareToMeTable: FC<ShareToMeProps> = ({ data, isLoading }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const columns: TableProps<ShareToMeDataType>["columns"] = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (_, record) => (
        <CodePreview
          code={record.code}
          lang={record.lang}
          height="5rem"
          showLangBadge={false}
        />
      ),
    },
    {
      title: "Lang",
      key: "lang",
      render: (_, record) => (
        <Tag
          color={`${theme.activeColor}40`}
          key={record.key}
          className={font?.className}
          style={{
            color: theme.activeColor,
          }}
        >
          {record.lang}
        </Tag>
      ),
    },
    {
      title: "Shared By",
      key: "sharedBy",
      render: (_, record) => {
        return <UsersAvatar sharedBy={record.sharedBy} />;
      },
    },

    {
      title: "View Code",
      key: "sharedId",
      render: (_, record) => (
        <div className="w-full">
          <ViewButton title="Go to editor" variant="link" sharedId={record.sharedId} />
        </div>
      ),
    },
  ];

  const dataSource: ShareToMeDataType[] = useMemo<ShareToMeDataType[]>(() => {
    return data?.map((item) => ({
      key: item.id,
      code: item.code,
      lang: item.lang,
      sharedBy: item.ownerDetails,
      sharedId: item.sharedId,
    }));
  }, [data]);

  return (
    <StyledATable
      $theme={theme}
      className="max-md:w-[800px] w-full custom-scrollbar"
      columns={columns as ColumnsType}
      dataSource={dataSource}
      scroll={{ x: 800 }}
      loading={isLoading}
      virtual
      locale={{
        emptyText: (
          <EmptyContent title="No shared snippets yet" rootClassName="py-5" />
        ),
      }}
    />
  );
};

export default ShareToMeTable;
