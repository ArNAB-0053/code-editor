import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareToMeList } from "@/services/share";
import { useSelector } from "react-redux";
import { IShareDataModel } from "@/@types/share";
import { HeaderTitle } from "../../header-title";
import { TabsProps } from "antd";
import { IoGrid } from "react-icons/io5";
import { RiLayoutGrid2Line } from "react-icons/ri";
import ShareTemplate from "../template";
import ShareToMeTable from "./table";
import ShareToMeCard from "./card";
import { EmptyContent } from "@/components/empty";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";

const ShareToMe = () => {
  const userId = useSelector(selectedUserId);
  const { data, isLoading } = useShareToMeList(userId);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <IoGrid />,
      children: (
        <ShareToMeCard data={data as IShareDataModel[]} isLoading={isLoading} />
      ),
    },
    {
      key: "2",
      label: <RiLayoutGrid2Line size={20} />,
      children: (
        <ShareToMeTable
          isLoading={isLoading}
          data={data as IShareDataModel[]}
        />
      ),
    },
  ];

  return data && data?.length > 0 ? (
    <ShareTemplate
      items={items}
      leftExtraContent={
        <HeaderTitle data={data as IShareDataModel[]} title="Shared With Me" />
      }
    />
  ) : (
    <>
      <HeaderTitle data={data as IShareDataModel[]} title="Shared With Me" />
      <div
        className="w-full mt-4 mb-8 py-8 rounded-xl"
        style={{
          backgroundColor: theme.border5,
        }}
      >
        <EmptyContent
          boxClassName=" opacity-50"
          titleClassName="text-md opacity-60"
          title="No shared snippets yet"
        />
      </div>
    </>
  );
};

export default ShareToMe;
