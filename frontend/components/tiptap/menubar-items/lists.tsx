import { btn, btnBgColor } from "..";
import { IEditorAndEditorState } from ".";
import { MdFormatListBulleted } from "react-icons/md";
import { VscListOrdered } from "react-icons/vsc";

import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { themeConfig } from "@/config/themeConfig";

export const MenuBarLists = ({
  editor,
  editorState,
}: IEditorAndEditorState) => {
    const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btn(editorState?.isBulletList)}
        style={{
          backgroundColor: btnBgColor(editorState?.isBulletList, theme),
        }}
      >
        <MdFormatListBulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={btn(editorState?.isOrderedList)}
        style={{
          backgroundColor: btnBgColor(editorState?.isOrderedList, theme),
        }}
      >
        <VscListOrdered />
      </button>
    </>
  );
};
