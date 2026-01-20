import { btn, btnBgColor } from "../menu-bar";
import { IEditorAndEditorState } from ".";
import { FiBold, FiItalic } from "react-icons/fi";
import { TbStrikethrough } from "react-icons/tb";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";

export const TextStyle = ({ editor, editorState }: IEditorAndEditorState) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        className={btn(editorState.isBold)}
        disabled={!editorState.canBold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isBold, theme),
        }}
      >
        <FiBold />
      </button>

      <button
        className={btn(editorState.isItalic)}
        disabled={!editorState.canItalic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isItalic, theme),
        }}
      >
        <FiItalic />
      </button>

      <button
        className={btn(editorState?.isStrike)}
        disabled={!editorState.canStrike}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        style={{
          backgroundColor: btnBgColor(editorState?.isStrike, theme),
        }}
      >
        <TbStrikethrough size={20} />
      </button>
    </>
  );
};
