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
import Sider from "./sider";
import { editorFonts, websiteFonts } from "@/fonts";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";
import { ThemeTypes } from "@/@types/theme";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import { useAutoSaveCode } from "@/services/code";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  selectedCode,
  selectedEditorId,
  selectedOutput,
  setCodeRedux,
  setEditorId,
  setLangRedux,
} from "@/redux/slices/editorSlice";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { AModal } from "../ui/antd";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";

const StyledSplitter = styled(Splitter)<{ $theme: ThemeTypes }>`
  .ant-splitter-bar {
    background: ${({ $theme }) => $theme.splitterColor} !important;
    width: 4px !important;
  }

  .ant-splitter-bar-dragger::before {
    background: ${({ $theme }) => $theme.splitterColor} !important;
  }
`;

export default function EditorComponent({
  p_lang,
  isShared = false,
}: {
  p_lang: string;
  isShared?: boolean;
}) {
  const defaultCode = getDefaultCode(p_lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [sharingDetails, setSharingDetails] = useState(null);

  // Share
  

  const currentCode = useSelector(selectedCode);
  const currentOutput = useSelector(selectedOutput);

  const dispatch = useDispatch();

  const editorFont = useSelector(selectEditorFont);
  const editorFontSize = useSelector(selectEditorFontSize);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const userId = useSelector(selectedUserId);
  const editorId = useSelector(selectedEditorId);

  const autoSaveCode = useAutoSaveCode();

  const theme = themeConfig(editorTheme);

  // refs for monaco editor
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);

  const debouncedCode = useDebounce(currentCode, 1000);
  const lastSaveRef = useRef("");
  // const isAutoSaving = useRef(false);

  // useEffect(() => {
  //   if (currentCode !== debouncedCode) {
  //     isAutoSaving.current = true;
  //     toast.loading("Saving…", { id: "autoSave" });
  //   }
  // }, [currentCode, debouncedCode]);

  useEffect(() => {
    if (isShared || !userId) return;
    if (debouncedCode.trim() === lastSaveRef.current.trim()) {
      // toast.dismiss("autoSave");
      return;
    }

    toast.loading("Saving…", { id: "autoSave" });

    autoSaveCode.mutate(
      {
        userId: userId,
        lang: p_lang,
        code: debouncedCode,
      },
      {
        onSuccess: (res) => {
          lastSaveRef.current = debouncedCode;
          dispatch(setCodeRedux(res?.code));
          dispatch(setLangRedux(res?.lang));
          dispatch(setEditorId(res?.id));
          // isAutoSaving.current = false;
          toast.success("Saved!", { id: "autoSave" });
        },
        onError: (e) => {
          // isAutoSaving.current = false;
          toast.error("Failed to save", { id: "autoSave" });
        },
      }
    );
  }, [isShared, debouncedCode, userId, p_lang, dispatch]);

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

  // Generate Shared Link


  console.log(sharingDetails)

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, system-ui",
        height: "calc(100vh - 25px)",
      }}
      className="w-full overflow-y-hidden flex items-start justify-between gap-x-0 relative"
    >
      <Sider p_lang={p_lang} />

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
                p_lang={p_lang}
                isCopied={isCopied}
                setIsCopied={setIsCopied}
                loading={loading}
                setLoading={setLoading}
                setError={setError}
                isShared={isShared}
              />
              <div className="pt-2">
                <Editor
                  value={currentCode}
                  onChange={(value) => dispatch(setCodeRedux(value ?? ""))}
                  width="100%"
                  height="calc(95vh - 95px)"
                  defaultLanguage={p_lang}
                  language={p_lang}
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
              className={`min-h-[95vh] overflow-y-auto border-r relative ${
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
                loading={loading}
                setError={setError}
              />
              <div className="p-2 ">
                {error ? (
                  <span style={{ color: "#ffb4b4" }}>{error}</span>
                ) : (
                  currentOutput ||
                  (loading ? (
                    <div
                      className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-[2px]"
                      style={{
                        backgroundColor: theme.border10,
                        color: theme.textColor,
                      }}
                    >
                      <LuLoader className="animate-spin" size={24} />
                    </div>
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
