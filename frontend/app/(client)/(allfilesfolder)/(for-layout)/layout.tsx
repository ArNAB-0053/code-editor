"use client";
import CreateNew from "@/components/file/create-new";
import { useBreadcrumbs, useFileListByUserId } from "@/services/files";
import React, { ReactNode } from "react";
import { IBreadcrumbData, IFilesListRequest } from "@/@types/files";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import FilesBreadcrumbs from "@/components/files-breadcrumbs";
import { selectFolderId } from "@/redux/slices/fileFolderSlice";

const Forlayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const parentId = params?.id?.at(-1) ?? null;

    const currentFolderId = useSelector(selectFolderId);

  //   console.log("params.id => ", params.id);

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
