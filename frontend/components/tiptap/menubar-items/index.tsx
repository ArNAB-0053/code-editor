import { IEditor, IEditorState } from "../menu-bar";

export interface IEditorAndEditorState extends IEditor {
    editorState: IEditorState,
}

export * from "./alignment"
export * from "./block"
export * from "./headings"
export * from "./lists"
export * from "./others"
export * from "./text-style"