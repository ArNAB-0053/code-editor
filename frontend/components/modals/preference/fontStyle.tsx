import { AInput } from "@/components/ui/antd";
import ASelect from "@/components/ui/antd/select";
import { editorFonts, websiteFonts } from "@/fonts";
import { getFontLabel } from "@/helper/font-style";
import { useDebounce } from "@/hooks/useDebounce";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectWebsiteFont,
  setEditorFont,
  setEditorFontSize,
  setWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const WebsiteFontFamily = () => {
  const websiteFont = useSelector(selectWebsiteFont);
  const dispatch = useDispatch();

  const handleChange = (value: WebsiteFontsKey) => {
    dispatch(setWebsiteFont(value));
  };

  const fontOptions = Object.entries(websiteFonts).map(([key]) => ({
    value: key,
    label: getFontLabel(key),
  }));

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold tracking-wide opacity-90">
        Website Font Family
      </h3>
      <p className="text-xs opacity-60 -mt-1">
        Choose a font for your website.
      </p>

      <ASelect
        value={websiteFont}
        style={{ width: 250 }}
        onChange={handleChange}
        options={fontOptions}
      />
    </div>
  );
};

export const EditorFontSize = () => {
  const dispatch = useDispatch();
  const editorFontSize = useSelector(selectEditorFontSize);
  const [fontSize, setFontSize] = useState(editorFontSize);

  const debouncedValue = useDebounce(fontSize, 200);

  useEffect(() => {
    if (!debouncedValue) return;
    const size = Number(debouncedValue);
    if (!isNaN(size) && size > 6 && size < 64) {
      dispatch(setEditorFontSize(size));
    }
  }, [debouncedValue, dispatch]);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold tracking-wide opacity-90">
        Editor Font Size
      </h3>
      <p className="text-xs opacity-60 -mt-1">
        Choose a font-size for your code editor.
      </p>
      <AInput
        placeholder="Enter your name"
        value={fontSize}
        onChange={(e) => setFontSize(Number(e.target.value))}
        style={{ width: 250 }}
      />
    </div>
  );
};

export const EditorFontFamily = () => {
  const editorFont = useSelector(selectEditorFont);
  const dispatch = useDispatch();

  const handleChange = (value: EditorFontKey) => {
    dispatch(setEditorFont(value));
  };

  const fontOptions = Object.entries(editorFonts).map(([key, label]) => ({
    value: key,
    label,
  }));

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold tracking-wide opacity-90">
        Editor Font Family
      </h3>
      <p className="text-xs opacity-60 -mt-1">
        Choose a font for your code editor.
      </p>

      <ASelect
        value={editorFont}
        style={{ width: 250 }}
        onChange={handleChange}
        options={fontOptions}
      />
    </div>
  );
};
