import { FileTypeEnum } from "./_enums";

export interface IFilesListRequest {
    OwnerId: string;
}

export interface IFilesDetailsRequest {
    OwnerId: string;
    FileId: string;
}

export interface ICreateFileRequest {
    OwnerId: string;
    FileName: string;
    FileType: FileTypeEnum;
    Lang?: string
    ParentId? : ObjectId;
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

export interface IFilesModel {
    ownerId: string;
    fileName: string;
    fileType: FileTypeEnum;
    lang?: string
    parentId? : ObjectId;
    id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    codeContent: ICodeContent;
}

export interface IFilesListResponse {
    status: "success" | "error";
    data: IFilesModel[];
}

export interface IFileDetailsResponse {
    status: "success" | "error";
    data: IFilesModel;
}