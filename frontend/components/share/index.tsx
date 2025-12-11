"use client";
import { usesharedData } from "@/services/code";
import { useParams } from "next/navigation";
import EditorComponent from "../editor/editor";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCodeRedux,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { useSharedData } from "@/services/share";
import { useSelector } from "react-redux";
import { selectedUserId } from "@/redux/slices/userSlice";

const ShareEditor = () => {
  const params = useParams();
  const shareId = params?.editorId;
  const userId = useSelector(selectedUserId);

  console.log(shareId, userId);

  const dispatch = useDispatch();

  const payload = {
    ShareId: String(shareId),
    CurrentUserId: userId,
  };

  const { data: sharedData, isLoading } = useSharedData(payload);
  console.log(sharedData);

  useEffect(() => {
    if (!sharedData) return;
    // console.log(sharedData)
    dispatch(setCodeRedux(sharedData?.code));
    dispatch(setOutputRedux(sharedData?.output));
    dispatch(setLangRedux(sharedData?.lang));
  }, [sharedData, dispatch]);

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
