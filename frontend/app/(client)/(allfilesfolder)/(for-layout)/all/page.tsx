"use client"
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import FileComponent from "@/components/file/file-component";
import ShareByMe from "@/components/file/share/by-me";
import ShareToMe from "@/components/file/share/to-me";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const params = useParams();
  const parentId = params?.id?.at(-1) ?? null;

  // console.log("params.id => ", params.id);

  const userId = useSelector(selectedUserId);
  const payload: IFilesListRequest = {
    OwnerId: userId,
    IsDeleted: false,
    ParentId: parentId,
  };
  const { data: files, isLoading } = useFileListByUserId(payload);
  // console.log(files?.data);
  return (
    <>
      <FileComponent
        files={files as IFilesListResponse}
        isLoading={isLoading}
      />
      {!parentId && (
        <>
          <ShareToMe />
          <ShareByMe />
        </>
      )}
    </>
  );
};

export default Page;
