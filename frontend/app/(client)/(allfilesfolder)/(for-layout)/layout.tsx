"use client";
import CreateNew from "@/components/file/create-new";
import { useBreadcrumbs, useFileListByUserId } from "@/services/files";
import React, { ReactNode } from "react";
import { IFilesListRequest } from "@/@types/files";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const Forlayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const parentId = params?.id?.at(-1) ?? null;

//   console.log("params.id => ", params.id);

  const userId = useSelector(selectedUserId);
  const payload: IFilesListRequest = {
    OwnerId: userId,
    IsDeleted: false,
    ParentId: parentId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  const {data: breadcrumbsData, isLoading: isBreadcrumbLoading} = useBreadcrumbs(parentId as string)
  console.log(breadcrumbsData)

  return (
    <>

      <CreateNew files={!isLoading && files} />
      {children}
    </>
  );
};

export default Forlayout;
