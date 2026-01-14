import { SetterFunctionTypesString } from "@/@types/_base";
import { themeConfig } from "@/config/themeConfig";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { Segmented } from "antd";
import { FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

interface SharedSiderProps {
  setValue: SetterFunctionTypesString;
}

const SharedSider = ({ setValue }: SharedSiderProps) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <div className="w-full mb-2 p-1" style={{ backgroundColor: theme.border10 }}>
      <Segmented
        options={[
          {
            label: (
              <div
                className="text-sm flex items-center opacity-80 gap-x-2"
                style={{
                  color: theme.textColor,
                }}
              >
                <FaInfoCircle />
                Info
              </div>
            ),
            value: "info",
          },
          {
            label: (
              <div
                className="text-sm flex items-center opacity-80 gap-x-2"
                style={{
                  color: theme.textColor,
                }}
              >
                <FaExternalLinkAlt />
                Links
              </div>
            ),
            value: "Links",
          },
        ]}
        onChange={(value) => {
          setValue(value);
          console.log(value); // string
        }}
        className="w-full! rounded-none! bg-transparent!"
      />
    </div>
  );
};

export default SharedSider;
