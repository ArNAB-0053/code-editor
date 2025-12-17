import { IOwnerDetails, IShareDataModel } from "@/@types/share";
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
import { StyledATable } from "../../styledATable";
import { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  code: string;
  lang: string;
  sharedBy: IOwnerDetails;
  sharedId: string;
}

interface ShareToMeTableProps {
  data: IShareDataModel[];
}

const ShareToMeTable: FC<ShareToMeTableProps> = ({ data }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const columns: TableProps<DataType>["columns"] = [
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
      title: "Shared Id",
      key: "sharedId",
      render: (_, record) => (
        <div className="w-full">
          <ViewButton variant="link" sharedId={record.sharedId} />
        </div>
      ),
    },
  ];

  const dataSource: DataType[] = useMemo<DataType[]>(() => {
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
      className="overflow-x-auto w-full max-md:w-[1200px] custom-scrollbar"
      columns={columns as ColumnsType}
      dataSource={dataSource}
    />
  );
};

export default ShareToMeTable;
