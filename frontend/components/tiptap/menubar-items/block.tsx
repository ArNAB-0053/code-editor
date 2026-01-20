import { btn } from "../menu-bar";
import { IEditorAndEditorState } from ".";
import { IoCode } from "react-icons/io5";
import { RiDoubleQuotesR } from "react-icons/ri";

export const MenuBarBlock = ({ editor, editorState }: IEditorAndEditorState) => {
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btn(editorState.isCodeBlock)}
      >
        <IoCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editorState.isBlockquote)}
      >
        <RiDoubleQuotesR />
      </button>
    </>
  );
};