import { themeConfig } from "@/config/themeConfig";
import { settingsData } from "@/constants/preference-constants";
import { selectEditorTheme } from "@/redux/slices/preferenceSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditorTheme from "./theme";
import {
  EditorFontFamily,
  EditorFontSize,
  WebsiteFontFamily,
} from "./fontStyle";
import {
  selectActiveField,
  selectParenntKey,
  setActiveField,
  setParentKey,
} from "@/redux/slices/activeFieldSlice";
import { useDispatch } from "react-redux";
import { AModal } from "../../ui/antd";
import { DataNode, EventDataNode } from "antd/es/tree";
import FieldHeading from "./heading";
import { ADirectoryTree } from "@/components/ui/antd";
import { CDivider } from "@/components/ui/custom";
import { MODAL_HEIGHT } from "@/components/ui";

const ActiveField = ({
  children,
  fieldKey,
  activeField,
}: {
  children: React.ReactNode;
  fieldKey: string;
  activeField: string;
}) => {
  const isActive = fieldKey === activeField;
  console.log("activeField -> dnhsghds", activeField);

  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);

  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (isActive) {
      queueMicrotask(() => setGlow(true));
      const timeout = setTimeout(() => {
        setGlow(false);
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  return (
    <div className="relative">
      {fieldKey === activeField && glow && (
        <div
          className="absolute rounded-sm w-full h-full animate-pulse"
          style={{
            background: `${theme.activeColor}30`,
            border: `2px solid ${theme.activeColor}50`,
            boxShadow: `0 0 12px ${theme.activeColor}70`,
          }}
        />
      )}

      <div className="p-5">{children}</div>
    </div>
  );
};

const PreferenceModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dispatch = useDispatch();
  const activeField = useSelector(selectActiveField);
  const activeParentField = useSelector(selectParenntKey);
  const editorTheme = useSelector(selectEditorTheme);

  // console.log(activeField);
  const theme = themeConfig(editorTheme);
  // const activeColor = theme.activeColor;

  const renderField = () => {
    if (activeParentField === "editor") {
      return (
        <>
          <FieldHeading title="Adjust how your editor looks by modifying the font size, font family, and theme settings here." />

          <CDivider style={{ width: "92%" }} />

          <ActiveField fieldKey="editor-font-size" activeField={activeField}>
            <EditorFontSize />
          </ActiveField>

          <ActiveField fieldKey="editor-font" activeField={activeField}>
            <EditorFontFamily />
          </ActiveField>

          <ActiveField fieldKey="editor-theme" activeField={activeField}>
            <EditorTheme />
          </ActiveField>
        </>
      );
    } else if (activeParentField === "session") {
      return <>dhsuagdgsa</>;
    } else {
      return (
        <>
          <FieldHeading title="Adjust how your website looks by modifying the font size, font family, and theme settings here." />
          <CDivider style={{ width: "92%" }} />
          <ActiveField fieldKey="appearance-font" activeField={activeField}>
            <WebsiteFontFamily />
          </ActiveField>
        </>
      );
    }
  };

  const treeDataWithTooltips = settingsData.map((item, i) => ({
    ...item,
    title: (
      <p
        className={`text-xs ${i === 0 ? "" : "mt-4"} mb-2  relative`}
        style={{ color: `${theme.outputColor}80` }}
      >
        {item.title}
      </p>
    ),
    children: item.children.map((child) => ({
      ...child,
      title: (
        <div className="my-2 flex items-center gap-x-5 relative">
          <div className="h-[35px] w-0.5 bg-white/5 absolute left-[2.3px] -top-3" />
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 translate-x-[0.1px]" />
          <p>{child.title}</p>
        </div>
      ),
    })),
  }));

  return (
    <AModal
      title="Preferences"
      centered
      open={open}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={false}
      className="overflow-hidden"
    >
      <div
        className="w-full flex mt-7  items-center justify-between"
        style={{ height: MODAL_HEIGHT }}
      >
        <ADirectoryTree
          treeData={treeDataWithTooltips}
          // selectable={isChild ? false : true}
          expandedKeys={settingsData.reduce<string[]>((acc, item) => {
            acc.push(item?.key, ...item.children.map((c) => c.key));
            return acc;
          }, [])}
          selectedKeys={
            activeField ? [activeField] : [treeDataWithTooltips[0].key]
          }
          onSelect={(keys, info) => {
            const node = info.node as EventDataNode<DataNode> & {
              parentKey?: string;
            };
            if (keys.length > 0) {
              dispatch(setActiveField(keys[0] as string));
              dispatch(
                setParentKey(
                  node?.parentKey ? node.parentKey : (keys[0] as string)
                )
              );
            }
          }}
          className="min-w-[25%] pr-3 custom-scrollbar"
        />

        <CDivider
          style={{
            height: `calc(${MODAL_HEIGHT} + 2vh)`,
          }}
          className="-translate-y-1 p-0 pr-0 mr-0"
          direction="horizontal"
        />

        <div
          className="flex-1 pl-3 overflow-y-auto overflow-x-hidden custom-scrollbar relative "
          style={{ height: MODAL_HEIGHT }}
        >
          {renderField()}
        </div>
      </div>
    </AModal>
  );
};

export default PreferenceModal;
