import { btn, btnStyle } from "../menu-bar";
import { IEditorAndEditorState } from ".";
import { GoHorizontalRule } from "react-icons/go";
import { FaHighlighter, FaRedo, FaUndo } from "react-icons/fa";
import { CDivider } from "@/components/ui/custom";

export const MenubarOthersItems = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
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
      >
        <FaHighlighter size={14} />
      </button>

      <CDivider direction="vertical" />
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
