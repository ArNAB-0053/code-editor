"use client";
import { EditorFontKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { editorFonts } from "@/fonts";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectEditorTheme,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { Editor, Monaco } from "@monaco-editor/react";
import { Code } from "lucide-react";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";

type CodePreviewType = {
  code: string;
  lang: string;
  height?: string;
  showLangBadge?: boolean;
};

const CodePreview = ({
  code,
  lang,
  height = "10rem",
  showLangBadge = true,
}: CodePreviewType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const editorFont = useSelector(selectEditorFont);
  const editorFontSize = useSelector(selectEditorFontSize);

  const syntaxRules = getEditorSytaxRules(theme);

  const handleBeforeMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("app-dark", {
      base: "vs-dark",
      inherit: true,
      rules: syntaxRules,
      colors: {
        "editor.background": theme.editorBackground,
        "editor.foreground": theme.outputColor,
        "editorLineNumber.foreground": theme.editorLineNumberForeground,
        "editorLineNumber.activeForeground": theme.outputColor,
        "editor.selectionBackground": theme.editorSelectionBackground,
        "editorCursor.foreground": theme.outputColor,
      },
    });
  };
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: height,
        width: '100%'
      }}
    >
      <div className="absolute inset-0 p-4">
        <Editor
          value={code}
          width="100%"
          height="100%"
          defaultLanguage={lang}
          language={lang}
          theme="app-dark"
          beforeMount={handleBeforeMount}
          options={{
            fontFamily: editorFonts[editorFont as EditorFontKey],
            fontSize: editorFontSize - 2,
            minimap: { enabled: false },
            automaticLayout: true,
            readOnly: true,
            scrollbar: {
              vertical: "hidden",
              horizontal: "hidden",
            },
            lineNumbers: "off",
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
          }}
          className=" blur-[0.5px] pointer-events-none "
        />
      </div>

      <div className=" h-full w-full absolute bg-linear-to-b from-transparent via-white/10 to-white/15 blur-2xl" />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${theme.editorBackground}95 85%)`,
        }}
      />

      {/* Language Badge */}
      {showLangBadge && (
        <div className="absolute bottom-3 right-3">
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md flex items-center gap-1.5"
            style={{
              background: `${theme.activeColor}25`,
              borderColor: `${theme.activeColor}40`,
              borderWidth: "1px",
              color: theme.activeColor,
            }}
          >
            <Code size={12} />
            {lang}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePreview;
