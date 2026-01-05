"use client";
import { IFilesListRequest, IFilesListResponse } from "@/@types/files";
import FileComponent from "@/components/file/file-component";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useFileListByUserId } from "@/services/files";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

const FolderFileLayout = () => {
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
  console.log(files?.data);
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

export default FolderFileLayout;
