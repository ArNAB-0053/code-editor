"use client";
import { useParams } from "next/navigation";
import EditorComponent from "../editor/editor";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useSharedData } from "@/services/share";
import { useSelector } from "react-redux";
import { selectedUserId, selectedUserUsername } from "@/redux/slices/userSlice";

const ShareEditor = () => {
  const params = useParams();
  const shareId = params?.editorId;
  const userId = useSelector(selectedUserId);
  const username = useSelector(selectedUserUsername);

  console.log(shareId, userId);

  const dispatch = useDispatch();

  const payload = {
    ShareId: String(shareId),
    CurrentUserId: username,
  };

  const { data: sharedData, isLoading } = useSharedData(payload);
  console.log(sharedData);

  useEffect(() => {
    if (!sharedData || isLoading) return;
    dispatch(setLangRedux(sharedData?.lang));
    dispatch(setCodeRedux(sharedData?.code));
    dispatch(setOutputRedux(sharedData?.output));
  }, [sharedData, dispatch, isLoading]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full">
      <EditorComponent p_lang={sharedData?.lang.trim()} isShared />
    </div>
  );
};

export default ShareEditor;
