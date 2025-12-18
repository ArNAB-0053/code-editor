import { selectedUserId } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const SharedByMePage = () => {
      const userId = useSelector(selectedUserId);
  const params = useParams();
  const shareId = params?.editorId;
  return <div>SharedByMePage</div>;
};

export default SharedByMePage;
