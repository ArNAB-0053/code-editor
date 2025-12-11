import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { EditorFontKey, WebsiteFontsKey } from "@/@types/font";
import Cookies from "js-cookie";
import { setCookies } from "@/helper/cookies";

export interface preferenceState {
  editorTheme: string;
  editorFont: EditorFontKey;
  editorFontSize: number;
  webSiteFont: string;
}

const initialConfig: preferenceState = {
  editorTheme: Cookies.get("theme") || "app-dark",
  editorFont: "cascadia" as EditorFontKey,
  editorFontSize: 14,
  webSiteFont: Cookies.get("font") || "prompt",
};

export const prefercenceSlice = createSlice({
  name: "prefercence",
  initialState: initialConfig,
  reducers: {
    setEditorFont: (state, action: PayloadAction<EditorFontKey>) => {
      state.editorFont = action.payload;
    },
    setEditorFontSize: (state, action: PayloadAction<number>) => {
      state.editorFontSize = action.payload;
    },
    setEditorTheme: (state, action: PayloadAction<string>) => {
      state.editorTheme = action.payload;
      setCookies("theme", 365, "lax", action.payload);
    },
    setWebsiteFont: (state, action: PayloadAction<WebsiteFontsKey>) => {
      state.webSiteFont = action.payload;
      setCookies("font", 365, "lax", action.payload);
    },
  },
});

export const {
  setEditorFont,
  setEditorFontSize,
  setEditorTheme,
  setWebsiteFont,
} = prefercenceSlice.actions;

export const selectEditorFont = (state: RootState) =>
  state.preferences.editorFont;
export const selectEditorFontSize = (state: RootState) =>
  state.preferences.editorFontSize;
export const selectEditorTheme = (state: RootState) =>
  state.preferences.editorTheme;
export const selectWebsiteFont = (state: RootState) =>
  state.preferences.webSiteFont;

export default prefercenceSlice.reducer;
