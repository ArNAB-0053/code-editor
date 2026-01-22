import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ILangContent {
  code: string;
  output: string;
  editorId: string;
}

export interface IEditorState {
  content: Record<string, ILangContent>;
  currentLang: string;
}

const initialState: IEditorState = {
  content: {},
  currentLang: "",
};

// Updated to fix bug#43
const ensureFile = (state: IEditorState, lang: string) => {
  if (!state.content[lang]) {
    state.content[lang] = {
      code: "",
      output: "",
      editorId: "",
    };
  }
};

export const editorCodeSlice = createSlice({
  name: "editorCode",
  initialState,
  reducers: {
    setLangRedux: (state, action: PayloadAction<string>) => {
      state.currentLang = action.payload;
    },

    setCodeRedux: (state, action: PayloadAction<string>) => {
      const lang = state.currentLang;
      if (!lang) return;
      ensureFile(state, lang);
      state.content[lang].code = action.payload;
    },

    setOutputRedux: (state, action: PayloadAction<string>) => {
      const lang = state.currentLang;
      if (!lang) return;
      ensureFile(state, lang);
      state.content[lang].output = action.payload;
    },

    setEditorId: (state, action: PayloadAction<string>) => {
      const lang = state.currentLang;
      if (!lang) return;
      ensureFile(state, lang);
      state.content[lang].editorId = action.payload;
    },
  },
});

export const { setCodeRedux, setLangRedux, setOutputRedux, setEditorId } =
  editorCodeSlice.actions;

export const selectedLang = (state: RootState) => state.editorCode.currentLang;

export const selectedCode = (state: RootState) => {
  const lang = state.editorCode.currentLang;
  return state.editorCode.content[lang]?.code || "";
};

export const selectedOutput = (state: RootState) => {
  const lang = state.editorCode.currentLang;
  return state.editorCode.content[lang]?.output || "";
};

export const selectedEditorId = (state: RootState) => {
  const lang = state.editorCode.currentLang;
  return state.editorCode.content[lang]?.editorId || "";
};

export default editorCodeSlice.reducer;
