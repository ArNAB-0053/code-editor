import { btn, btnBgColor } from "../menu-bar";
import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";
import { IEditorAndEditorState } from ".";

export const Alignment = ({ editor, editorState }: IEditorAndEditorState) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        className={btn(editorState?.isLeftAlign)}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isLeftAlign, theme),
        }}
      >
        <FiAlignLeft />
      </button>

      <button
        className={btn(editorState?.isCenterAlign)}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isCenterAlign, theme),
        }}
      >
        <FiAlignCenter />
      </button>

      <button
        className={btn(editorState?.isRightAlign)}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isRightAlign, theme),
        }}
      >
        <FiAlignRight />
      </button>

      <button
        className={btn(editorState?.isJustifyAlign)}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isJustifyAlign, theme),
        }}
      >
        <FiAlignJustify />
      </button>
    </>
  );
};
