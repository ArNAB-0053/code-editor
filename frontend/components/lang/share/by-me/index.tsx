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
import EmptyShare from "../../empty";

const ShareByMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareByMeList(userId);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <IoGrid />,
      children: <ShareByMeCard data={data as IShareByMeRes[]} />,
    },
    {
      key: "2",
      label: <RiLayoutGrid2Line size={20} />,
      children: <ShareByMeTable data={data as IShareByMeRes[]} />,
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
        <HeaderTitle data={data as IShareByMeRes[]} title="Shared By Me" />
      }
    />
  );
};

export default ShareByMe;
