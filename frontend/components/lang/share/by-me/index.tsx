import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareByMeList } from "@/services/share";
import { useSelector } from "react-redux";
import ShareByMeTable from "./table";
import { IShareByMeRes } from "@/@types/share";
import ShareByMeCard from "./card";
import { HeaderTitle } from "../../header-title";
import { TabsProps } from "antd";
import { IoGrid } from "react-icons/io5";
import { RiLayoutGrid2Line } from "react-icons/ri";
import ShareTemplate from "../template";
import { EmptyContent } from "@/components/empty";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";

const ShareByMe = () => {
  const userId = useSelector(selectedUserId);
  const { data, isLoading } = useShareByMeList(userId);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <IoGrid />,
      children: (
        <ShareByMeCard data={data as IShareByMeRes[]} isLoading={isLoading} />
      ),
    },
    {
      key: "2",
      label: <RiLayoutGrid2Line size={20} />,
      children: (
        <ShareByMeTable data={data as IShareByMeRes[]} isLoading={isLoading} />
      ),
    },
  ];

  return data && data?.length > 0 ? (
    <ShareTemplate
      items={items}
      leftExtraContent={
        <HeaderTitle data={data as IShareByMeRes[]} title="Shared By Me" />
      }
    />
  ) : (
    <>
      <HeaderTitle data={data as IShareByMeRes[]} title="Shared By Me" />
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

export default ShareByMe;
