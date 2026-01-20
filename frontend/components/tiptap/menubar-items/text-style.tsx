import { btn } from "../menu-bar";
import { IEditorAndEditorState } from ".";
import { FiBold, FiItalic } from "react-icons/fi";
import { TbStrikethrough } from "react-icons/tb";

export const TextStyle = ({ editor, editorState }: IEditorAndEditorState) => {
  return (
    <>
      <button
        className={btn(editorState.isBold)}
        disabled={!editorState.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <FiBold />
      </button>

      <button
        className={btn(editorState.isItalic)}
        disabled={!editorState.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <FiItalic />
      </button>

      <button
        className={btn(editorState?.isStrike)}
        disabled={!editorState.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <TbStrikethrough size={20} />
      </button>
    </>
  );
};
