"use client";

import "@/styles/editor.css";

import {
  FiBold,
  FiItalic,
  FiType,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";
import { TbStrikethrough } from "react-icons/tb";
import { FaHighlighter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";

export const MenuBar = ({ editor }: any) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded-md transition ${active ? "bg-indigo-500 text-white" : ""}`;

  return (
    <div className="flex gap-1 w-full py-1 button-group ">
      <button
        className={btn(editor.isActive("bold"))}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FiBold />
      </button>

      <button
        className={btn(editor.isActive("italic"))}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FiItalic />
      </button>

      <button
        className={btn(editor.isActive("strike"))}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <TbStrikethrough size={20} />
      </button>

      <button
        className={btn(editor.isActive("heading", { level: 1 }))}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <FiType />
      </button>

      <button
        className={btn(editor.isActive({ textAlign: "left" }))}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <FiAlignLeft />
      </button>

      <button
        className={btn(editor.isActive({ textAlign: "center" }))}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <FiAlignCenter />
      </button>

      <button
        className={btn(editor.isActive({ textAlign: "right" }))}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <FiAlignRight />
      </button>

      <button
        className={btn(editor.isActive({ textAlign: "justify" }))}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <FiAlignJustify />
      </button>

      <button
        className={btn(editor.isActive("highlight"))}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
      >
        <FaHighlighter />
      </button>
    </div>
  );
};
