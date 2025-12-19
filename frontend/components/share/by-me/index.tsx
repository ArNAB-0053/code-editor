"use client";
import { IUserDetails } from "@/@types/auth";
import { IOwnerDetails, IShareByMeResRemaining, IShareDataModel } from "@/@types/share";
import {
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSharedByMeDataDetails } from "@/services/share";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ShareEditor from "../ShareEditor";
import Users from "../users";

const SharedByMePage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const shareId = params?.editorId;

  const [sharedWith, setSharedWith] = useState<IUserDetails[]>();
  const [remaining, setRemaining] = useState<IShareByMeResRemaining[]>();
  const sharedWithRef = useRef<IUserDetails[]>(null);
  const remainingRef = useRef<IShareByMeResRemaining[]>(null);

  const payload = {
    SharedId: String(shareId),
    OwnerId: userId,
  };

  const { data: sharedData, isLoading } = useSharedByMeDataDetails(payload);

  // console.log("BY_ME", sharedData);

  // const otherShares = sharedData.

  useEffect(() => {
    if (!sharedData || isLoading) return;
    dispatch(setLangRedux(sharedData?.share?.lang));
    dispatch(setCodeRedux(sharedData?.share?.code));
    dispatch(setOutputRedux(sharedData?.share?.output));

    sharedWithRef.current = sharedData?.sharedWith;
    remainingRef.current = sharedData?.remaining;
    setSharedWith(sharedWithRef.current);
    setRemaining(remainingRef.current)

    // console.log(sharedData)
  }, [sharedData, dispatch, isLoading]);

  return (
    <ShareEditor
      detailsComponent={<Users users={sharedWith as IUserDetails[]} remaining={remaining as IShareByMeResRemaining[]} />}
      isLoading={isLoading}
      sharedData={sharedData?.share as IShareDataModel}
      heading="Shares Details"
      // headerIcon={<FaShareFromSquare/>}
    />
  );
};

export default SharedByMePage;
