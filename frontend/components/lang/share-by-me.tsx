"use client";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import { IShareByMeRes, IShareDataModel } from "@/@types/share";
import { themeConfig } from "@/config/themeConfig";
import { editorFonts, websiteFonts } from "@/fonts";
import {
  selectEditorFont,
  selectEditorFontSize,
  selectEditorTheme,
  selectWebsiteFont,
} from "@/redux/slices/preferenceSlice";
import { selectedUserId } from "@/redux/slices/userSlice";
import { useShareByMeList } from "@/services/share";
import { useSelector } from "react-redux";
import ACard from "../ui/antd/card";
import { Editor, Monaco } from "@monaco-editor/react";
import getEditorSytaxRules from "@/helper/editor-syntax-rules";

const ShareByMe = () => {
  const userId = useSelector(selectedUserId);
  const { data } = useShareByMeList(userId);

  console.log("[share] __share_by_me__ : ", data);

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
    <div>
      <h3 className="mb-4 font-semibold relative pl-4">
        Shared By Me
        <div
          className="h-full w-1 absolute left-0 top-1/2 -translate-y-1/2"
          style={{ background: theme.activeColor }}
        />
      </h3>

      {data?.length === 0 && (
        <p style={{ color: theme.disabledTextColor }}>
          No data found that shared by you.
        </p>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {data?.map((x: IShareByMeRes, i) => (
          <ACard key={i} title={null}>
            <div
              className="pb-2 relative overflow-hidden rounded-xl "
              style={{
                backgroundColor: theme?.editorBackground,
              }}
            >
              <div className="w-full h-24 overflow-hidden rounded-xl px-3 py-2 ">
                <Editor
                  value={x.share.code}
                  width="100%"
                  height="calc(95vh - 95px)"
                  defaultLanguage={x.share.lang}
                  language={x.share.lang}
                  theme="app-dark"
                  beforeMount={handleBeforeMount}
                  options={{
                    fontFamily: editorFonts[editorFont as EditorFontKey],
                    fontSize: editorFontSize,
                    minimap: { enabled: false },
                    automaticLayout: true,
                  }}
                  className="rounded-xl!"
                />
              </div>

              <div className="bg-white/5 h-full w-full absolute left-0 top-0 backdrop-blur-[0.9px] rounded-xl" />
            </div>
            lang: {x.share.lang}
            <br />
            output: {x.share.output}
            <div>
              Share To:
              {x.sharedWith.map((u, i) => (
                <p key={i}>{u.username}</p>
              ))}
            </div>
          </ACard>
        ))}
      </div>
    </div>
  );
};

export default ShareByMe;
