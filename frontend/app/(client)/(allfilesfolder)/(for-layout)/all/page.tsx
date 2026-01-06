"use client";
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import FileComponent from "@/components/file/file-component";
import ShareByMe from "@/components/file/share/by-me";
import ShareToMe from "@/components/file/share/to-me";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import { useSelector } from "react-redux";

const Page = () => {
  const currentFolderId = useSelector(selectFolderId);
  const userId = useSelector(selectedUserId);
  const payload: IFilesListRequest = {
    OwnerId: userId,
    IsDeleted: false,
    ParentId: currentFolderId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);
  // console.log(files?.data);
  return (
    <>
      <FileComponent
        files={files as IFilesListResponse}
        isLoading={isLoading}
        isFileComponentPage
      />
      {!currentFolderId && (
        <>
          <ShareToMe />
          <ShareByMe />
        </>
      )}
    </>
  );
};

export default Page;
