"use client";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFileCode } from "@/services/files";
import {
  selectedCreatedFileLang,
  setCreatedFileCodeRedux,
  setCreatedFileIdRedux,
  setCreatedFileLangRedux,
  setCreatedFileNameRedux,
  setCreatedFileOutputRedux,
} from "@/redux/slices/createdFilesEditorSlice";
import { IFileCodeModel } from "@/@types/files";
import CreatedEditorComponent from "@/components/editor/editors-component/createdFileEditor";

const Code = () => {
  const [codeDataState, setCodeDataState] = useState<IFileCodeModel>();
  const params = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const lang = useSelector(selectedCreatedFileLang);

  const fileId = params?.fileId;
  const codeDataRef = useRef<IFileCodeModel>(null);

  const payload = {
    FileId: String(fileId),
    OwnerId: userId,
  };

  const { data: codeData, isLoading } = useFileCode(payload);

  useEffect(() => {
    if (!codeData || isLoading) return;
    console.log("GOING IN");
    dispatch(setCreatedFileIdRedux(codeData?.data?.fileId));
    dispatch(setCreatedFileLangRedux(codeData?.data?.lang));
    dispatch(setCreatedFileCodeRedux(codeData?.data?.code));
    dispatch(setCreatedFileOutputRedux(codeData?.data?.output));
    dispatch(setCreatedFileNameRedux(codeData?.data?.fileName));

    codeDataRef.current = codeData?.data;
    setCodeDataState(codeDataRef.current);
    console.log("codeData", codeData);
  }, [codeData, dispatch, isLoading]);

  return <CreatedEditorComponent p_lang={lang} isShared />;
};

export default Code;
