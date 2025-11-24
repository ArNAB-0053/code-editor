import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";

const FieldHeading = ({ title }: { title: string }) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <h3 className="text-xs opacity-70 mb-3 px-5">
        {title}
      </h3>

      <div
        className="w-4 rounded-r-sm h-[30px] absolute top-0 -left-3"
        style={{
          background: theme.activeColor,
        }}
      />
    </>
  );
};

export default FieldHeading;
