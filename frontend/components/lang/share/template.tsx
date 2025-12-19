import React from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsProps } from "antd";
import { useDispatch } from "react-redux";
import {
  selectedActiveTabKey,
  setActiveTabKey,
} from "@/redux/slices/activeTab";

type ShareByMeType = {
  items: TabsProps["items"];
  leftExtraContent: React.ReactElement;
};

const ShareTemplate = ({ items, leftExtraContent }: ShareByMeType) => {
  const activeTabKey = useSelector(selectedActiveTabKey);

  const dispatch = useDispatch();

  const onChange = (key: string) => {
    dispatch(setActiveTabKey(key));
  };

  return (
    // NOTE: inside className "share" must be present as this is used for styling "Tabs" that is inside "share" className - without "share" it will get the default style of antd.
    <div className="share w-full mb-10">
      <Tabs
        defaultActiveKey={activeTabKey}
        items={items}
        onChange={onChange}
        tabBarExtraContent={{
          left: leftExtraContent,
        }}
      />
    </div>
  );
};

export default ShareTemplate;


{/* <EmptyShare
        title="No shared snippets yet"
        description="Share your code snippets with others to see them here"
      /> */}