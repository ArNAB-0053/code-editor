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
import { getDefaultCode } from "@/helper/defaultCode";

const MainEditor = ({ p_lang }: { p_lang: string }) => {
  const dispatch = useDispatch();
  const defaultCode = getDefaultCode(p_lang);

  const userId = useSelector(selectedUserId);
  const { data: codeData, isLoading } = useGetCode({
    userId: userId,
    lang: p_lang,
  });

  useEffect(() => {
    dispatch(setLangRedux(p_lang));
  }, [p_lang, dispatch]);

  useEffect(() => {
    if (isLoading) return;

    if (!codeData) {
      dispatch(setCodeRedux(defaultCode));
      return;
    }

    if (codeData.lang === p_lang) {
      dispatch(setCodeRedux(codeData.code));
      dispatch(setEditorId(codeData.id));
      dispatch(setOutputRedux(codeData.output));
    }
  }, [codeData, isLoading, p_lang, defaultCode, dispatch]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <EditorComponent p_lang={p_lang} />
    </div>
  );
};

export default MainEditor;
