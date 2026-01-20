import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from "react-icons/lu";
import { TbLetterP } from "react-icons/tb";
import { IEditorAndEditorState } from ".";
import { ASelect } from "@/components/ui/antd";
import { ReactElement } from "react";

import { useSelector } from "react-redux";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { themeConfig } from "@/config/themeConfig";
import { CDivider } from "@/components/ui/custom";
import { IEditorState } from "../menu-bar";

interface getIconProps {
  val: string;
  size?: number;
}

// helpers functions
const headingOptions = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
  { label: "Heading 5", value: "h5" },
  { label: "Heading 6", value: "h6" },
];

const getHeadingValue = (editorState: IEditorState) => {
  switch (true) {
    case editorState.isParagraph:
      return "p";
    case editorState.isHeading1:
      return "h1";
    case editorState.isHeading2:
      return "h2";
    case editorState.isHeading3:
      return "h3";
    case editorState.isHeading4:
      return "h4";
    case editorState.isHeading5:
      return "h5";
    case editorState.isHeading6:
      return "h6";
    default:
      return undefined;
  }
};

const getIcon = ({ val, size = 18 }: getIconProps) => {
  switch (val) {
    case "p":
      return <TbLetterP size={size} />;
    case "h1":
      return <LuHeading1 size={size} />;
    case "h2":
      return <LuHeading2 size={size} />;
    case "h3":
      return <LuHeading3 size={size} />;
    case "h4":
      return <LuHeading4 size={size} />;
    case "h5":
      return <LuHeading5 size={size} />;
    case "h6":
      return <LuHeading6 size={size} />;
    default:
      return null;
  }
};

// helper component
const OptionTemplate = ({
  labelIcon,
  labelText,
  noDivider = false,
}: {
  labelIcon: ReactElement;
  labelText: string;
  noDivider?: boolean;
}) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  return (
    <>
      <div className="flex items-center gap-x-2 px-2 py-1">
        <span
          className=" text-[10px] w-6 h-6 flex items-center justify-center rounded-sm"
          style={{
            backgroundColor: theme.border,
          }}
        >
          {labelIcon}
        </span>
        <span className="text-[13px]">{labelText}</span>
      </div>
      {noDivider && <CDivider className="mt-0! mb-0!" />}
    </>
  );
};

export const Headings = ({ editor, editorState }: IEditorAndEditorState) => {
  const value = getHeadingValue(editorState);

  const onChange = (val: string) => {
    const chain = editor.chain().focus();

    if (val === "p") {
      chain.setParagraph().run();
    } else {
      chain.toggleHeading({ level: Number(val.slice(1)) }).run();
    }
  };

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  return (
    <ASelect
      value={value}
      options={headingOptions}
      optionRender={(option) => {
        const item: getIconProps = {
          val: option?.value as string,
        };
        const icon = getIcon(item as getIconProps);
        return (
          <OptionTemplate
            labelIcon={icon!}
            labelText={option.label as string}
            noDivider={option.value !== "h6"}
          />
        );
      }}
      labelRender={(option) => {
        const item: getIconProps = {
          val: option?.value as string,
          size: 13,
        };
        const icon = getIcon(item);
        return (
          <div className="flex items-center gap-x-2">
            {icon}
            <span className="text-[11px] font-normal">{option.label}</span>
          </div>
        );
      }}
      onChange={onChange}
      placeholder="Text style"
      dropdownStyle={{
        width: "11rem",
        padding: "0",
        borderRadius: "5px",
        backgroundColor: theme.border5,
        borderWidth: "1px",
        borderColor: theme.border10,
      }}
      dropdownElementMarginBottom="0px"
      optionBorderRadius="0px"
      dropdownItemPadding="0"
      dropdownItemMinHeight="0"
    />
  );
};
