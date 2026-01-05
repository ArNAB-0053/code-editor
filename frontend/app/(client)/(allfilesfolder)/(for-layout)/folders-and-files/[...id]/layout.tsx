"use client";
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import CreateNew from "@/components/file/create-new";
import FileComponent from "@/components/file/file-component";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import { useParams } from "next/navigation";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

const IdLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const parentId = params?.id?.at(-1) ?? null;
  console.log("params.id => ", params.id);

  const userId = useSelector(selectedUserId);
  const payload: IFilesListRequest = {
    OwnerId: userId,
    IsDeleted: false,
    ParentId: parentId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);

  console.log(files?.data);

  return (
    <div>
      {/* <CreateNew files={null} /> */}
      {/* <FileComponent
        files={files as IFilesListResponse}
        isLoading={isLoading}
      /> */}
      {children}
    </div>
  );
};

export default IdLayout;
