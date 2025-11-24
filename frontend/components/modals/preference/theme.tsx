import ASelect from "@/components/ui/antd/select";
import { editorThemes } from "@/constants/preference-constants";
import { selectEditorTheme, setEditorTheme } from "@/redux/slices/preferenceSlice";
import { EditorThemeOptionsTypes } from "@/@types/theme";
import { useSelector, useDispatch } from "react-redux";

const EditorTheme = () => {
  const editorTheme = useSelector(selectEditorTheme);
  const dispatch = useDispatch();

  const handleChange = (value: string) => {
    dispatch(setEditorTheme(value));
  };

  const themeOptions = Object.entries(editorThemes as EditorThemeOptionsTypes).map(([key, label]) => ({
    value: key,
    label,
  }));

  return (
    <div className="space-y-2 ">
      <h3 className="text-sm font-semibold tracking-wide opacity-90">
        Editor Theme
      </h3>
      <p className="text-xs opacity-60 -mt-1">
        Pick a theme for the Monaco editor (syntax + background).
      </p>

      <ASelect
        value={editorTheme}
        style={{ width: 250 }}
        onChange={handleChange}
        options={themeOptions}
      />
    </div>
  );
};

export default EditorTheme;
