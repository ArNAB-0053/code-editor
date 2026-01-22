import { IBaseReturn } from "./_base";

export interface IBaseNoteReturn {
    id?: string;
    title?: string;
    content: string;
    codeId: string;
}

export interface INoteModel {
    Id?: string;
    Title?: string;
    Content: string;
    CodeId: string;
}

export interface INoteResult extends IBaseReturn {
    data: IBaseNoteReturn
}

export interface IGetNoteDetailsRequest {
    CodeId: string;
    // NoteId: string;
}

export interface IRenameNoteRequest {
    CodeId: string;
    Title: string;
}