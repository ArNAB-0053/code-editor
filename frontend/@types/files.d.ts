import { IBaseReturn } from "./_base";
import { FileTypeEnum } from "./_enums";

export interface IFilesListRequest {
  OwnerId: string;
  IsDeleted?: boolean;
  ParentId?: ObjectId | string | null;
}

export interface IFilesDetailsRequest {
  OwnerId: string;
  FileId: string;
}

export interface ICreateFileRequest {
  OwnerId: string;
  FileName: string;
  FileType: FileTypeEnum;
  Lang?: string;
  ParentId?: ObjectId;
}

export interface ICodeContent {
  id: string;
  code: string;
  lang: string;
  fileId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  output: string;
  ownerId: string;
}

export interface IFileFolderModel {
  ownerId: string;
  fileName: string;
  fileType: FileTypeEnum;
  lang?: string;
  parentId?: ObjectId;
  id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deleteTime?: Date;
}

export interface IFileCodeModel {
  id: ObjectId;
  fileId: ObjectId | string;
  ownerId: string;
  fileName: string;
  code: string;
  lang: string;
  output: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilesModel extends IFileFolderModel {
  codeContent: ICodeContent;
}

export interface IFileFolder {
  files: IFilesModel[];
  folders: IFileFolderModel[];
}

export interface IFilesListResponse extends IBaseReturn {
  status: "success" | "error";
  data: IFileFolder;
}

export interface IFileDetailsResponse extends IBaseReturn {
  data: IFilesModel;
}
export interface IFileCodeResponse extends IBaseReturn {
  data: IFileCodeModel;
}

export interface ISoftDeleteRequest {
  FileId: ObjectId;
  OwnerId: string;
}
export interface IFileRenameRequest {
  FileId: ObjectId;
  FileName: string;
  OwnerId: string;
}
export interface IUpdateFilesCodeRequest {
  FileId: ObjectId;
  Code: string;
  OwnerId: string;
}
export interface IUpdateFilesOutputRequest {
  FileId: ObjectId;
  OwnerId: string;
  Output: string;
}

export interface IBreadcrumbData {
  id: string;
  name: string;
}

export interface IBreadcrumbsRes extends IBaseReturn {
  data: IBreadcrumbData[];
}

export interface IChildrenResponce extends IBaseReturn {
  data: IFilesModel[]
}

export interface IParentId extends IBaseReturn {
  data: string
}