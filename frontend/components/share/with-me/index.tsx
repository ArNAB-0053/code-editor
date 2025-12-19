"use client";
import { IOwnerDetails, IShareDataModel } from "@/@types/share";
import {
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSharedWithMeDataDetails } from "@/services/share";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Owner from "../owner";
import ShareEditor from "../ShareEditor";

const SharedWithMePage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const shareId = params?.editorId;

  const [ownerDetails, setOwnerDetails] = useState<IOwnerDetails>();
  const [remaining, setRemaining] = useState<IShareDataModel[]>();
  const ownerDetailsRef = useRef<IOwnerDetails>(null);
  const remainingRef = useRef<IShareDataModel[]>(null);

  const payload = {
    ShareId: String(shareId),
    CurrentUserId: userId,
  };

  const { data: sharedData, isLoading } = useSharedWithMeDataDetails(payload);

  // console.log(sharedData);

  useEffect(() => {
    if (!sharedData || isLoading) return;
    dispatch(setLangRedux(sharedData?.share?.lang));
    dispatch(setCodeRedux(sharedData?.share?.code));
    dispatch(setOutputRedux(sharedData?.share?.output));

    ownerDetailsRef.current = sharedData?.share?.ownerDetails;
    remainingRef.current = sharedData?.remaining;
    setOwnerDetails(ownerDetailsRef.current);
    setRemaining(remainingRef.current);
  }, [sharedData, dispatch, isLoading]);

  return (
    <>
      <ShareEditor
        detailsComponent={
          <Owner
            ownerDetails={ownerDetails as IOwnerDetails}
            remaining={remaining as IShareDataModel[]}
          />
        }
        isLoading={isLoading}
        sharedData={sharedData?.share as IShareDataModel}
        heading="Owner User Info"
      />
    </>
  );
};

export default SharedWithMePage;
