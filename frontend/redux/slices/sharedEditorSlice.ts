import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILangContent } from "./editorSlice";
import { RootState } from "../store";

export interface ISharedContent extends ILangContent {
  lang: string
}

export interface ISharedEditorState {
  content: Record<string, ISharedContent>;
  sharedId: string
}

const initialState: ISharedEditorState = {
  content: {},
  sharedId: "",
}

export const sharedEditorCodeSlice = createSlice({
  name: "sharedEditorCode",
  initialState,
  reducers: {
    setShareIdRedux: (state, action: PayloadAction<string>) => {
      state.sharedId = action.payload;
      if (!state.content[action.payload]) {
        state.content[action.payload] = {
          code: "", 
          output: "",
          editorId: "",
          lang: ""
        };
      }
    },

    setShareCodeRedux: (state, action: PayloadAction<string>) => {
      const sharedId = state.sharedId;
      if (!sharedId) return;

      state.content[sharedId].code = action.payload;
    },

    setShareOutputRedux: (state, action: PayloadAction<string>) => {
      const sharedId = state.sharedId;
      if (!sharedId) return;

      state.content[sharedId].output = action.payload;
    },

    setShareEditorId: (state, action: PayloadAction<string>) => {
      const sharedId = state.sharedId;
      if (!sharedId) return;

      state.content[sharedId].editorId = action.payload;
    },

    setShareLangRedux: (state, action: PayloadAction<string>) => {
      const sharedId = state.sharedId;
      if (!sharedId) return;

      state.content[sharedId].lang = action.payload;
    },
  },
});

export const {setShareCodeRedux, setShareEditorId, setShareIdRedux, setShareLangRedux, setShareOutputRedux} = sharedEditorCodeSlice.actions

export const selectedSharedId = (state: RootState) => state.sharedEditorCode.sharedId;

export const selectedSharedCode = (state: RootState) => {
  const sharedId = state.sharedEditorCode.sharedId;
  return state.sharedEditorCode.content[sharedId]?.code || "";
};

export const selectedSharedOutput = (state: RootState) => {
  const sharedId = state.sharedEditorCode.sharedId;
  return state.sharedEditorCode.content[sharedId]?.output || "";
};

export const selectedSharedEditorId = (state: RootState) => {
  const sharedId = state.sharedEditorCode.sharedId;
  return state.sharedEditorCode.content[sharedId]?.editorId || "";
};

export const selectedSharedLang = (state: RootState) => {
  const sharedId = state.sharedEditorCode.sharedId;
  return state.sharedEditorCode.content[sharedId]?.lang || "";
};

export default sharedEditorCodeSlice.reducer;