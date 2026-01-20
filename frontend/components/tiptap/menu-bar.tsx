// taken from: `https://tiptap.dev/docs/examples/basics/default-text-editor`

"use client";

import "@/styles/editor.css";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import {
  Alignment,
  Headings,
  MenuBarBlock,
  MenuBarLists,
  MenubarOthersItems,
  TextStyle,
} from "./menubar-items";
import { CDivider } from "../ui/custom";
import { cn } from "@/lib/utils";

export interface IEditor {
  editor: Editor;
}

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

const extensions = [TextStyleKit, StarterKit];

export const btnStyle =
  "w-6 h-6 flex items-center justify-center rounded-md transition";
export const btn = (active: boolean) =>
  cn(btnStyle, active ? "bg-indigo-500 text-white" : "");

export const MenuBar = ({ editor }: IEditor) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const editorState: IEditorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        isHighlight: ctx.editor?.isActive("highlight") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  if (!editor) return null;

  return (
    // (this -> py-2)
    <div className="flex items-center flex-wrap gap-1 w-full py-2 px-4 button-group ">
      <Headings editor={editor} editorState={editorState} />
      <CDivider direction="vertical" />
      <TextStyle editor={editor} editorState={editorState} />
      <CDivider direction="vertical" />
      <MenuBarLists editor={editor} editorState={editorState} />
      <CDivider direction="vertical" />
      <MenuBarBlock editor={editor} editorState={editorState} />
      <CDivider direction="vertical" />
      <Alignment editor={editor} />
      <CDivider direction="vertical" />
      <MenubarOthersItems editor={editor} editorState={editorState} />
    </div>
  );
};
