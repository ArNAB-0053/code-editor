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
import CreatedEditorComponent from "@/components/editor/editors-component/createdFileEditor";

const Code = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const userId = useSelector(selectedUserId);
  const lang = useSelector(selectedCreatedFileLang);

  const fileId = params?.fileId;

  const payload = {
    FileId: String(fileId),
    OwnerId: userId,
  };

  const { data: codeData, isLoading } = useFileCode(payload);
  const [delayedLoading, setDelayedLoading] = useState(true);
  const delayedLoadingRef = useRef<boolean>(false);

  useEffect(() => {
    if (!codeData || isLoading) return;

    dispatch(setCreatedFileIdRedux(codeData?.data?.fileId));
    dispatch(setCreatedFileLangRedux(codeData?.data?.lang));
    dispatch(setCreatedFileCodeRedux(codeData?.data?.code));
    dispatch(setCreatedFileOutputRedux(codeData?.data?.output));
    dispatch(setCreatedFileNameRedux(codeData?.data?.fileName));
  }, [codeData, dispatch, isLoading]);

  // Just adding 1.3 extra second to provide time for editor to get the color.
  useEffect(() => {
    if (isLoading) {
      delayedLoadingRef.current = true;
      setDelayedLoading(delayedLoadingRef.current);
      return;
    }
    const timer = setTimeout(() => {
      setDelayedLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return <CreatedEditorComponent p_lang={lang} isLoading={delayedLoading} />;
};

export default Code;
