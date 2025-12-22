"use client";
import { IOwnerDetails, IShareDataModel } from "@/@types/share";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSharedWithMeDataDetails } from "@/services/share";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Owner from "../owner";
import ShareEditor from "../ShareEditor";
import { selectedSharedCode, setShareCodeRedux, setShareIdRedux, setShareLangRedux, setShareOutputRedux } from "@/redux/slices/sharedEditorSlice";

const SharedWithMePage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const currCode = useSelector(selectedSharedCode)
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
    dispatch(setShareIdRedux(sharedData?.share.sharedId))
    dispatch(setShareLangRedux(sharedData?.share?.lang));
    dispatch(setShareCodeRedux(sharedData?.share?.code));
    dispatch(setShareOutputRedux(sharedData?.share?.output));

    console.log(currCode);

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
