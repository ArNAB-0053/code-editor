import { ThemeTypes } from "@/@types/theme";
import { cn } from "@/lib/utils";
import { type Editor } from "@tiptap/react";

export interface IEditorState {
  isBold: boolean;
  canBold: boolean;
  isItalic: boolean;
  canItalic: boolean;
  isStrike: boolean;
  canStrike: boolean;
  isCode: boolean;
  canCode: boolean;
  isLeftAlign: boolean;
  isRightAlign: boolean;
  isCenterAlign: boolean;
  isJustifyAlign: boolean;
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

export interface IEditor {
  editor: Editor;
}

// Common button styles
const commonBtnStyle =
  "w-6 h-6 flex items-center justify-center rounded-md transition";

export const btnStyle = cn(commonBtnStyle, "text-white/80");

export const btn = (active: boolean) =>
  cn(commonBtnStyle, active ? "text-white" : "text-white/80");

export const btnBgColor = (active: boolean, theme: ThemeTypes) =>
  active ? theme.activeColor : "transparent";

export {default as TiptapEditor} from "./TiptapEditor";