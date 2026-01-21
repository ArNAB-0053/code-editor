import { btn, btnBgColor } from "..";
import { IEditorAndEditorState } from ".";
import { IoCode } from "react-icons/io5";
import { RiDoubleQuotesR } from "react-icons/ri";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";

export const MenuBarBlock = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={btn(editorState?.isCodeBlock)}
        style={{
          backgroundColor: btnBgColor(editorState?.isCodeBlock, theme),
        }}
      >
        <IoCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={btn(editorState?.isBlockquote)}
        style={{
          backgroundColor: btnBgColor(editorState?.isBlockquote, theme),
        }}
      >
        <RiDoubleQuotesR />
      </button>
    </>
  );
};
