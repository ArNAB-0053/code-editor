import { btn, btnBgColor, btnStyle } from "..";
import { IEditorAndEditorState } from ".";
import { GoHorizontalRule } from "react-icons/go";
import { FaHighlighter, FaRedo, FaUndo } from "react-icons/fa";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";

export const RuleHighlight = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={btnStyle}
      >
        <GoHorizontalRule />
      </button>

      <button
        className={btn(editorState?.isHighlight)}
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isHighlight, theme),
        }}
      >
        <FaHighlighter size={14} />
      </button>
    </>
  );
};

export const UndoRedo = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className={btnStyle}
      >
        <FaUndo size={14} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className={btnStyle}
      >
        <FaRedo size={14} />
      </button>
    </>
  );
};
