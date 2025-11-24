"use client";
import { useEffect, useRef, useState } from "react";
import { Splitter } from "antd";
import styled from "styled-components";
import { themeConfig } from "@/config/themeConfig";
import { Editor, Monaco } from "@monaco-editor/react";
import { getDefaultCode } from "@/helper/defaultCode";
import { useSelector } from "react-redux";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import EditorHeaderComponent from "./header";
import Sider from "../sider";
import { editorFonts, websiteFonts } from "@/fonts";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";
import { ThemeTypes } from "@/@types/theme";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";

const StyledSplitter = styled(Splitter)<{ $theme: ThemeTypes }>`
  .ant-splitter-bar {
    background: ${({ $theme }) => $theme.splitterColor} !important;
    width: 4px !important;
  }

  .ant-splitter-bar-dragger::before {
    background: ${({ $theme }) => $theme.splitterColor} !important;
  }
`;

export default function EditorComponent({ p_lang }: { p_lang: string }) {
  const defaultCode = getDefaultCode(p_lang);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const editorFont = useSelector(selectEditorFont);
  const editorFontSize = useSelector(selectEditorFontSize);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);

  const theme = themeConfig(editorTheme);

  // refs for monaco editor
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);

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

  useEffect(() => {}, [editorTheme]);

  const handleOnMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    monaco.editor.setTheme("app-dark");
  };

  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      const newTheme = themeConfig(editorTheme);
      const newSyntaxRules = getEditorSytaxRules(newTheme);

      // redefing the theme with new colors
      monacoRef.current.editor.defineTheme("app-dark", {
        base: "vs-dark",
        inherit: true,
        rules: newSyntaxRules,
        colors: {
          "editor.background": newTheme.editorBackground,
          "editor.foreground": newTheme.outputColor,
          "editorLineNumber.foreground": newTheme.editorLineNumberForeground,
          "editorLineNumber.activeForeground": newTheme.outputColor,
          "editor.selectionBackground": newTheme.editorSelectionBackground,
          "editorCursor.foreground": newTheme.outputColor,
        },
      });

      monacoRef.current.editor.setTheme("app-dark");
    }
  }, [editorTheme]);

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, system-ui",
        height: "calc(100vh - 25px)",
      }}
      className="w-full overflow-y-hidden flex items-start justify-between gap-x-0"
    >
      <Sider />

      {/* {JSON.stringify(editorFonts[editorFont])} */}
      <div className="flex w-full overflow-hidden border-t border-t-white/20">
        <StyledSplitter
          $theme={theme}
          style={{
            height: "100%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <Splitter.Panel defaultSize="60%" min="40%">
            <div
              style={{
                marginBottom: 8,
                borderColor: theme?.border20,
                background: theme.editorBackground,
              }}
              className={`border border-t-0 border-r-0 overflow-hidden text-white ${
                websiteFonts[websiteFont as WebsiteFontsKey]?.className
              }`}
            >
              <EditorHeaderComponent
                editorTheme={editorTheme}
                isOutput={false}
                code={code}
                setCode={setCode}
                p_lang={p_lang}
                isCopied={isCopied}
                setIsCopied={setIsCopied}
                setOutput={setOutput}
                loading={loading}
                setLoading={setLoading}
                setError={setError}
              />
              <div className="pt-2">
                <Editor
                  value={code}
                  onChange={(value) => setCode(value ?? "")}
                  width="100%"
                  height="calc(95vh - 95px)"
                  defaultLanguage={p_lang}
                  defaultValue={defaultCode}
                  theme="app-dark"
                  onMount={handleOnMount}
                  beforeMount={handleBeforeMount}
                  options={{
                    fontFamily: editorFonts[editorFont as EditorFontKey],
                    fontSize: editorFontSize,
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                />
              </div>
            </div>
          </Splitter.Panel>
          <Splitter.Panel defaultSize="40%" min="20%">
            <div
              className={`min-h-[95vh] overflow-y-auto border-r ${
                websiteFonts[websiteFont as WebsiteFontsKey]?.className
              }`}
              style={{
                background: theme.outputBackground,
                color: theme.outputColor,
                borderColor: theme.border15,
                whiteSpace: "pre-wrap",
              }}
            >
              <EditorHeaderComponent
                editorTheme={editorTheme}
                isOutput={true}
                setOutput={setOutput}
                loading={loading}
                setError={setError}
              />
              <div className="p-2 ">
                {error ? (
                  <span style={{ color: "#ffb4b4" }}>{error}</span>
                ) : (
                  output ||
                  (loading ? (
                    "Running..."
                  ) : (
                    <p className="opacity-60">No output</p>
                  ))
                )}
              </div>
            </div>
          </Splitter.Panel>
        </StyledSplitter>
      </div>
    </div>
  );
}
