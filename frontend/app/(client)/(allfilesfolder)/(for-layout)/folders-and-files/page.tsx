"use client";
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import FileComponent from "@/components/file/file-component";
import { selectFolderId, setFolderId } from "@/redux/slices/fileFolderSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const FolderFilePage = () => {
  const currentFolderId = useSelector(selectFolderId);
  const userId = useSelector(selectedUserId);
  const payload: IFilesListRequest = {
    OwnerId: userId,
    IsDeleted: false,
    ParentId: currentFolderId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFolderId(null));
  }, []);
  
  return (
    <>
      <FileComponent
        files={files as IFilesListResponse}
        isLoading={isLoading}
        isFileComponentPage
      />
    </>
  );
};

export default FolderFilePage;
