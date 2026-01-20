import { btn } from "../menu-bar";
import { IEditorAndEditorState } from ".";
import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";

export const MenuBarLists = ({ editor, editorState }: IEditorAndEditorState) => (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editorState.isBulletList)}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editorState.isOrderedList)}
      >
        <VscListOrdered />
      </button>
    </>
  );