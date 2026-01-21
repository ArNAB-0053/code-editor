import { ReactNode } from "react";
import { IEditor, IEditorState } from "..";
import { Alignment } from "./alignment";
import { MenuBarBlock } from "./block";
import { Headings } from "./headings";
import { MenuBarLists } from "./lists";
import { RuleHighlight, UndoRedo } from "./others";
import { TextStyle } from "./text-style";

export interface IEditorAndEditorState extends IEditor {
  editorState: IEditorState;
}

export interface IMenuItemsList {
  name: string;
  component: ReactNode;
}

// helpers
export const menuBarItemsListFn = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
  const menuItemsList: IMenuItemsList[] = [
    {
      name: "headings",
      component: <Headings editor={editor} editorState={editorState} />,
    },
    {
      name: "text-style",
      component: <TextStyle editor={editor} editorState={editorState} />,
    },
    {
      name: "lists",
      component: <MenuBarLists editor={editor} editorState={editorState} />,
    },
    {
      name: "blocks",
      component: <MenuBarBlock editor={editor} editorState={editorState} />,
    },
    {
      name: "alignments",
      component: <Alignment editor={editor} editorState={editorState} />,
    },
    {
      name: "rule-highlight",
      component: <RuleHighlight editor={editor} editorState={editorState} />,
    },
    {
      name: "undo-redo",
      component: <UndoRedo editor={editor} editorState={editorState} />,
    },
  ];

  return menuItemsList;
};

export const getMenuItems = (
  width?: number,
  menuBarItemsList?: IMenuItemsList[],
) => {
  if (!width) return menuBarItemsList;
  else if (width <= 500) return menuBarItemsList?.slice(0, 2);
  else if (width > 500 && width <= 780) return menuBarItemsList?.slice(0, 4);
  return menuBarItemsList;
};

export const remainingMenuItems = (
  width?: number,
  menuBarItemsList?: IMenuItemsList[],
) => {
  if (!width) return null;
  else if (width <= 500) return menuBarItemsList?.slice(2);
  else if (width > 500 && width <= 780) return menuBarItemsList?.slice(4);
  return null;
};

// exports
export * from "./alignment";
export * from "./block";
export * from "./headings";
export * from "./lists";
export * from "./others";
export * from "./text-style";
