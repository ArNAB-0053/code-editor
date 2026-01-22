// taken from: `https://tiptap.dev/docs/examples/basics/default-text-editor`

"use client";

import React, { useState } from "react";
import { useEditorState } from "@tiptap/react";
import { themeConfig } from "@/config/themeConfig";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

import "@/styles/editor.css";
import { CDivider } from "../ui/custom";
import MoreItems from "./more-items";

import { IEditor, IEditorState } from ".";
import {
  getMenuItems,
  menuBarItemsListFn,
  remainingMenuItems,
} from "./menubar-items";

export interface MenuBarProps extends IEditor {
  width?: number;
}

// Main MenuBar Component
export const MenuBar = ({ editor, width }: MenuBarProps) => {
  const [clicked, setClicked] = useState(false);

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

        isLeftAlign: ctx.editor?.isActive({ textAlign: "left" }) ?? false,
        isRightAlign: ctx.editor?.isActive({ textAlign: "right" }) ?? false,
        isCenterAlign: ctx.editor?.isActive({ textAlign: "center" }) ?? false,
        isJustifyAlign: ctx.editor?.isActive({ textAlign: "justify" }) ?? false,

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

  const menuBarItemsList = menuBarItemsListFn({ editor, editorState });

  const menuItems = getMenuItems(width, menuBarItemsList);
  const remainingItems = remainingMenuItems(width, menuBarItemsList);

  // console.log({
  //   menuItems: menuItems,
  //   remainingItems: remainingItems,
  // });

  if (!editor) return null;

  return (
    // (this -> py-2)
    <div className="flex flex-col gap-1.5 w-full pt-1 pb-1.5 px-2 button-group relative ">
      <div className="flex items-center flex-wrap gap-1 w-full button-group relative  ">
        {menuItems?.map((item, i) => (
          <React.Fragment key={i}>
            {item.component}
            {i < menuItems.length - 1 && (
              <CDivider direction="vertical" className="mx-1!" />
            )}
          </React.Fragment>
        ))}

        {remainingItems && remainingItems.length > 0 && (
          <>
            <CDivider direction="vertical" className="mx-1!" />
            <MoreItems setClicked={setClicked} clicked={clicked} />
          </>
        )}
      </div>

      {clicked && remainingItems && (
        <div
          className="flex items-center justify-start p-2 rounded-md absolute left-50 top-10 border "
          style={{
            color: theme.textColor,
            backgroundColor: theme.border,
            borderColor: theme.border10,
          }}
        >
          {remainingItems?.map((item, i) => (
            <React.Fragment key={i}>
              {item.component}
              {i < remainingItems.length - 1 && (
                <CDivider
                  direction="vertical"
                  style={{ backgroundColor: theme.border10 }}
                  className="mx-2! h-6!"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
