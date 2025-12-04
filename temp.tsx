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
import { useAutoSaveCode, useGetCode } from "@/services/code";
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
  setOutputRedux,
} from "@/redux/slices/editorSlice";
import { toast } from "sonner";
import { LuLoader } from "react-icons/lu";
import { AModal } from "../ui/antd";
import Link from "next/link";
import { appUrls } from "@/config/navigation.config";
import CodeEditor from "./editorr";

export default function EditorComponent({ p_lang }: { p_lang: string }) {
  const defaultCode = getDefaultCode(p_lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Share
  const [open, setOpen] = useState(false);

  const currentCode = useSelector(selectedCode);
  const currentOutput = useSelector(selectedOutput);

  const dispatch = useDispatch();
  const userId = useSelector(selectedUserId);
  const editorId = useSelector(selectedEditorId);

  const autoSaveCode = useAutoSaveCode();
  const { data: codeData, isLoading: isLoadingCode } = useGetCode({
    userId,
    lang: p_lang,
  });

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
    if (!codeData) return;
    dispatch(setEditorId(codeData?.id));
    dispatch(setCodeRedux(codeData?.code));
    dispatch(setOutputRedux(codeData?.output));
    dispatch(setLangRedux(codeData?.lang));
  }, [codeData, dispatch]);

  useEffect(() => {
    if (!userId) return;
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
  }, [debouncedCode, userId, p_lang, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, system-ui",
        height: "calc(100vh - 25px)",
      }}
      className="w-full overflow-y-hidden flex items-start justify-between gap-x-0 relative"
    >
      <CodeEditor
        currentCode={currentCode}
        currentOutput={currentOutput}
        editorId={editorId}
        p_lang={p_lang}
      />
    </div>
  );
}
