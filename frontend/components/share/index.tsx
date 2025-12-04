"use client";
import { useSharedCode } from "@/services/code";
import { useParams } from "next/navigation";
import EditorComponent from "../editor/editor";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setCodeRedux,
  setEditorId,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";

const ShareEditor = () => {
  const params = useParams();
  const editorId = params?.editorId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!editorId) return;
    dispatch(setEditorId(String(editorId)));
  }, [editorId, dispatch]);

  const { data: sharedCode, isLoading } = useSharedCode(String(editorId));

  useEffect(() => {
    if (!sharedCode) return;
    console.log(sharedCode)
    dispatch(setCodeRedux(sharedCode?.code));
    dispatch(setOutputRedux(sharedCode?.output));
    dispatch(setLangRedux(sharedCode?.lang));
  }, [sharedCode, dispatch]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-full">
      <EditorComponent p_lang={sharedCode?.lang.trim()} isShared />
    </div>
  );
};

export default ShareEditor;
