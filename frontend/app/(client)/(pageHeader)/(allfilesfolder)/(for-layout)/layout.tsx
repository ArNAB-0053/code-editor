"use client";
import CreateNew from "@/components/file/create-new";
import { useFileListByUserId } from "@/services/files";
import React, { ReactNode } from "react";
import { IFilesListRequest } from "@/@types/files";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";

const Forlayout = ({ children }: { children: ReactNode }) => {
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
      <CreateNew files={!isLoading && files} />
      {children}
    </>
  );
};

export default Forlayout;
