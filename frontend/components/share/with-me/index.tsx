"use client"
import { IOwnerDetails, IShareDataModel } from "@/@types/share";
import {
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSharedData } from "@/services/share";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Owner from "../owner";
import ShareEditor from "../ShareEditor";

const SharedWithMePage = () => {
  const userId = useSelector(selectedUserId);
  const params = useParams();
  const shareId = params?.editorId;

  // const username = useSelector(selectedUserUsername);

  const [ownerDetails, setOwnerDetails] = useState<IOwnerDetails>();
  const ownerDetailsRef = useRef<IOwnerDetails>(null);

  const payload = {
    ShareId: String(shareId),
    CurrentUserId: userId,
  };

  const { data: sharedData, isLoading } = useSharedData(payload);

  console.log("__sharedData => ", sharedData);

  const dispatch = useDispatch();

  // const { data: sharedData, isLoading } = useSharedData(payload);
  // console.log(sharedData);

  useEffect(() => {
    if (!sharedData || isLoading) return;
    dispatch(setLangRedux(sharedData?.lang));
    dispatch(setCodeRedux(sharedData?.code));
    dispatch(setOutputRedux(sharedData?.output));

    ownerDetailsRef.current = sharedData?.ownerDetails;
    // console.log("ownerDetailsRef.current", ownerDetailsRef.current);
    setOwnerDetails(ownerDetailsRef.current);
  }, [sharedData, dispatch, isLoading]);

  return (
    <ShareEditor
      detailsComponent={<Owner ownerDetails={ownerDetails!} />}
      isLoading={isLoading}
      sharedData={sharedData as IShareDataModel}
      heading="Owner User Info"
    />
  );
};

export default SharedWithMePage;
