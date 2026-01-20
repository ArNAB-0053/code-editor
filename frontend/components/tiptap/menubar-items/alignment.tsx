import { btn, IEditor } from "../menu-bar";
import {
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiAlignJustify,
} from "react-icons/fi";

export const Alignment = ({ editor }: IEditor) => (
  <>
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
  </>
);
