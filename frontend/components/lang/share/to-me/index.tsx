import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareToMeList } from "@/services/share";
import { useSelector } from "react-redux";
import {  IShareDataModel } from "@/@types/share";
import { HeaderTitle } from "../../header-title";
import { TabsProps } from "antd";
import { IoGrid } from "react-icons/io5";
import { RiLayoutGrid2Line } from "react-icons/ri";
import ShareTemplate from "../template";
import ShareToMeTable from "./table";
import EmptyShare from "../../empty";
import ShareToMeCard from "./card";

const ShareToMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareToMeList(userId);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <IoGrid />,
      children: <ShareToMeCard data={data as IShareDataModel[]} />,
    },
    {
      key: "2",
      label: <RiLayoutGrid2Line size={20} />,
      children: <ShareToMeTable data={data as IShareDataModel[]} />,
    },
  ];

  if (data?.length === 0)
    return (
      <EmptyShare
        title="No shared snippets yet"
        description="Share your code snippets with others to see them here"
      />
    );

  return (
    <ShareTemplate
      items={items}
      leftExtraContent={
        <HeaderTitle data={data as IShareDataModel[]} title="Shared By Me" />
      }
    />
  );
};

export default ShareToMe;
