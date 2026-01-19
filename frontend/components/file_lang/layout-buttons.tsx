import { themeConfig } from "@/config/themeConfig";
import { cn } from "@/lib/utils";
import {
  selectEditorLayout,
  setEditorLayout,
} from "@/redux/slices/editorLayout";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { transitionString } from "@/styles";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  VscLayoutPanel,
  VscLayoutPanelOff,
  VscLayoutSidebarRight,
  VscLayoutSidebarRightOff,
} from "react-icons/vsc";

const FileLangLayoutButtons = () => {
  const dispatch = useDispatch();
  const layout = useSelector(selectEditorLayout);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <button
        className={cn(
          "w-full h-full py-1 cursor-pointer group rounded-md relative overflow-hidden opacity-90 ",
          transitionString
        )}
        onClick={() => dispatch(setEditorLayout("horizontal"))}
        style={{
          color: theme.textColor,
        }}
      >
        {layout === "horizontal" ? (
          <VscLayoutSidebarRight />
        ) : (
          <VscLayoutSidebarRightOff />
        )}
      </button>

      <button
        className={cn(
          "w-full h-full py-1 cursor-pointer group rounded-md relative overflow-hidden opacity-90 ",
          transitionString
        )}
        onClick={() => dispatch(setEditorLayout("vertical"))}
        style={{
          color: theme.textColor,
        }}
      >
        {layout === "vertical" ? (
          <VscLayoutPanel size={16} />
        ) : (
          <VscLayoutPanelOff size={16} />
        )}
      </button>
    </>
  );
};

export default FileLangLayoutButtons;
