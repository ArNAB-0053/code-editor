"use client";
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import FileComponent from "@/components/file/file-component";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
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
