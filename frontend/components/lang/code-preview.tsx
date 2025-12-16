"use client";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import { themeConfig } from "@/config/themeConfig";
import { editorFonts, websiteFonts } from "@/fonts";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { useSelector } from "react-redux";
import { Editor, Monaco } from "@monaco-editor/react";
import { Code } from "lucide-react";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";

type CodePreviewType = {
  code: string;
  lang: string;
};

const CodePreview = ({ code, lang }: CodePreviewType) => {
  const editorTheme = useSelector(selectEditorTheme);
  const theme = themeConfig(editorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];
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
    <div className="relative h-40 overflow-hidden">
      <div className="absolute inset-0 p-3">
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
        />
      </div>

      <div className="bg-white/10 h-full w-full absolute blur-[1px] backdrop-blur-[0.1px]"></div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${theme.editorBackground}95 85%)`,
        }}
      />

      {/* Language Badge */}
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
    </div>
  );
};

export default CodePreview;
