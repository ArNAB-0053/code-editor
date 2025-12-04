import React, { useEffect } from "react";
import EditorComponent from "./editor";
import { useDispatch } from "react-redux";
import { useGetCode } from "@/services/code";
import {
  setCodeRedux,
  setEditorId,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";

const MainEditor = ({ p_lang }: { p_lang: string }) => {
  const dispatch = useDispatch();
  
  const userId = useSelector(selectedUserId);
  const { data: codeData } = useGetCode({
    userId: userId,
    lang: p_lang,
  });

  useEffect(() => {
    if (!codeData) return;
    dispatch(setEditorId(codeData?.id));
    dispatch(setCodeRedux(codeData?.code));
    dispatch(setOutputRedux(codeData?.output));
    dispatch(setLangRedux(codeData?.lang));
  }, [codeData, dispatch]);

  return (
    <div>
      <EditorComponent p_lang={p_lang} />
    </div>
  );
};

export default MainEditor;
