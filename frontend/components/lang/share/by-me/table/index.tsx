import { TableProps, Tag } from "antd";
import { FC, useMemo } from "react";
import CodePreview from "../../code-preview";
import UsersAvatar from "../users-avatar";
import { MAX_SHARE_VISIBLE } from "@/components/lang";
import ViewButton from "../../view-btn";
import {
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { WebsiteFontsKey } from "@/@types/font";
import { websiteFonts } from "@/fonts";
import { ColumnsType } from "antd/es/table";
import { StyledATable } from "@/styles/StyledATable";
import { EmptyContent } from "@/components/empty";
import { ShareByMeDataType, ShareByMeProps } from "@/@types/share";

const ShareByMeTable: FC<ShareByMeProps> = ({ data, isLoading }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const columns: TableProps<ShareByMeDataType>["columns"] = [
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
      title: "Shared With",
      key: "sharedWith",
      render: (_, record) => {
        const len = record.sharedWith.length;
        const isRem = len > MAX_SHARE_VISIBLE.TABLE;
        const rem = len - MAX_SHARE_VISIBLE.TABLE;

        return (
          <UsersAvatar
            sharedWith={record.sharedWith}
            isRem={isRem}
            len={len}
            rem={rem}
            type="table"
          />
        );
      },
    },

    {
      title: "Shared Id",
      key: "sharedId",
      render: (_, record) => (
        <div className="w-full">
          <ViewButton variant="link" sharedId={record.sharedId} />
        </div>
      ),
    },
  ];

  const dataSource: ShareByMeDataType[] = useMemo<ShareByMeDataType[]>(() => {
    return data?.map((item) => ({
      key: item.share.id,
      code: item.share.code,
      lang: item.share.lang,
      sharedWith: item.sharedWith,
      sharedId: item.share.sharedId,
    }));
  }, [data]);

  console.log(dataSource);

  return (
    <StyledATable
      $theme={theme}
      className="max-md:w-[800px] w-full custom-scrollbar"
      columns={columns as ColumnsType}
      dataSource={dataSource}
      scroll={{ x: 800 }}
      virtual
      loading={isLoading}
      locale={{
        emptyText: (
          <EmptyContent title="No shared snippets yet" rootClassName="py-5" />
        ),
      }}
    />
  );
};

export default ShareByMeTable;
