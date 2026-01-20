import { IEditor } from "../menu-bar";

export interface IEditorState {
    isBold: boolean;
    canBold: boolean;
    isItalic: boolean;
    canItalic: boolean;
    isStrike: boolean;
    canStrike: boolean;
    isCode: boolean;
    canCode: boolean;
    canClearMarks: boolean;
    isParagraph: boolean;
    isHeading1: boolean;
    isHeading2: boolean;
    isHeading3: boolean;
    isHeading4: boolean;
    isHeading5: boolean;
    isHeading6: boolean;
    isBulletList: boolean;
    isOrderedList: boolean;
    isCodeBlock: boolean;
    isBlockquote: boolean;
    isHighlight: boolean;
    canUndo: boolean;
    canRedo: boolean;
}

export interface IEditorAndEditorState extends IEditor {
    editorState: IEditorState
}

export * from "./alignment"
export * from "./block"
export * from "./headings"
export * from "./lists"
export * from "./others"
export * from "./text-style"