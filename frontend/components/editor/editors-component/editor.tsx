"use client";
import { useEffect, useRef, useState } from "react";
import { themeConfig } from "@/config/themeConfig";
import { Editor, Monaco } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { editorFonts, websiteFonts } from "@/fonts";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import { useAutoSaveCode } from "@/services/code";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  selectedCode,
  selectedLang,
  selectedOutput,
  setCodeRedux,
  setEditorId,
  setLangRedux,
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { messagesConfig } from "@/config/messages.config";
import EditorHeaderComponent from "../editor-headers/header";
import { selectEditorLayout } from "@/redux/slices/editorLayout";
import { cn } from "@/lib/utils";
import { useScreenWidth } from "@/hooks/useScreenWidth";
import { StyledSplitter } from ".";
import { EDITOR_HEIGHT, eHEIGHT } from "@/helper/_base.helper";

export default function EditorComponent({
  p_lang,
  isShared = false,
}: {
  p_lang: string;
  isShared?: boolean;
}) {
  // const defaultCode = getDefaultCode(p_lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const lang = useSelector(selectedLang);
  // const [sharingDetails, setSharingDetails] = useState(null);

  // console.log("___Editor___ (defaultCode)", defaultCode)

  const currentCode = useSelector(selectedCode);
  const currentOutput = useSelector(selectedOutput);

  const layout = useSelector(selectEditorLayout);

  const screenWidth = useScreenWidth();

  const dispatch = useDispatch();

  const editorFont = useSelector(selectEditorFont);
  const editorFontSize = useSelector(selectEditorFontSize);
  const editorTheme = useSelector(selectEditorTheme);
  const websiteFont = useSelector(selectWebsiteFont);
  const font = websiteFonts[websiteFont as WebsiteFontsKey];

  const userId = useSelector(selectedUserId);

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

    toast.loading(messagesConfig.AUTOSAVE.LOADING, { id: "autoSave" });

    autoSaveCode.mutate(
      {
        userId: userId,
        lang,
        code: debouncedCode,
      },
      {
        onSuccess: (res) => {
          lastSaveRef.current = debouncedCode;
          dispatch(setLangRedux(res?.lang));
          dispatch(setCodeRedux(res?.code)); 
          dispatch(setEditorId(res?.id));
          dispatch(setOutputRedux(res?.output)); // for bug#43
          // isAutoSaving.current = false;
          toast.success(messagesConfig.AUTOSAVE.SUCCESS, { id: "autoSave" });
        },
        onError: (e) => {
          // isAutoSaving.current = false;
          toast.error(messagesConfig.AUTOSAVE.FAILED, { id: "autoSave" });
        },
      }
    );
  }, [isShared, debouncedCode, userId, lang, dispatch]);

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

  // console.log(sharingDetails)

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, system-ui",
        height: EDITOR_HEIGHT,
      }}
      className="w-full overflow-y-hidden flex items-start justify-between gap-x-0 relative"
    >
      <div className="flex w-full overflow-hidden border-t border-t-white/20">
        <StyledSplitter
          $theme={theme}
          orientation={layout}
          style={{
            height: layout === "vertical" ? EDITOR_HEIGHT : "100%",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            width: "100%",
          }}
        >
          <StyledSplitter.Panel
            defaultSize={
              layout === "vertical"
                ? "80%"
                : screenWidth >= 1000
                ? "60%"
                : "50%"
            }
            min={screenWidth >= 1000 ? "40%" : "50%"}
            max="80%"
            className="overflow-hidden!"
          >
            <div
              style={{
                marginBottom: 8,
                borderColor: theme?.border20,
                background: theme.editorBackground,
                height: "100%",
              }}
              className={cn(
                "border-r overflow-hidden! text-white",
                font?.className
              )}
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
              <div className="h-full overflow-hidden">
                <Editor
                  key={lang}
                  value={currentCode}
                  onChange={(value) => {
                    dispatch(setCodeRedux(value ?? ""));
                  }}
                  width="100%"
                  height={layout === "vertical" ? "100%" : eHEIGHT}
                  defaultLanguage={p_lang}
                  language={lang}
                  // defaultValue={defaultCode}
                  theme="app-dark"
                  onMount={handleOnMount}
                  beforeMount={handleBeforeMount}
                  options={{
                    fontFamily: editorFonts[editorFont as EditorFontKey],
                    fontSize: editorFontSize,
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                  className="py-2!"
                />
              </div>
            </div>
          </StyledSplitter.Panel>
          <StyledSplitter.Panel
            defaultSize={
              layout === "vertical" ? "" : screenWidth >= 1000 ? "40%" : "50%"
            }
            min={
              layout === "vertical" ? "" : screenWidth >= 1000 ? "20%" : "40%"
            }
            max={
              layout === "vertical"
                ? "60%"
                : screenWidth >= 1000
                ? "40%"
                : "50%"
            }
            className="overflow-hidden!"
          >
            <div
              className={`overflow-hidden pb-4  border-r relative ${font?.className}`}
              style={{
                background: theme.outputBackground,
                color: theme.outputColor,
                borderColor: theme.border15,
                whiteSpace: "pre-wrap",
                height: layout === "horizontal" ? EDITOR_HEIGHT : "100%",
              }}
            >
              <div className="w-full backdrop-blur-2xl">
                <EditorHeaderComponent
                  editorTheme={editorTheme}
                  isOutput={true}
                  loading={loading}
                  setError={setError}
                />
              </div>

              {/* Scrolling enable for output here */}
              <div
                className={cn(
                  "p-2 overflow-y-auto custom-scrollbar overflow-x-hidden text-wrap ",
                  font?.className
                )}
                style={{
                  height: "calc(100% - 40px)",
                }}
              >
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
          </StyledSplitter.Panel>
        </StyledSplitter>
      </div>
    </div>
  );
}
