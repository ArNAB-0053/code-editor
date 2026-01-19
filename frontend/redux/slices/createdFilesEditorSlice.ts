import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILangContent } from "./editorSlice";
import { RootState } from "../store";

export interface ICreatedFileContent extends ILangContent {
  lang: string;
  fileName: string;
}

export interface ISharedEditorState {
  content: Record<string, ICreatedFileContent>;
  fileId: string;
}

const initialState: ISharedEditorState = {
  content: {},
  fileId: "",
};

const ensureFile = (state: ISharedEditorState, fileId: string) => {
  if (!state.content[fileId]) {
    state.content[fileId] = {
      code: "",
      output: "",
      editorId: "",
      lang: "",
      fileName: "main",
    };
  }
};


export const createdFileEditorSlice = createSlice({
  name: "createdFilesEditor",
  initialState,
  reducers: {
    
    setCreatedFileIdRedux: (state, action: PayloadAction<string>) => {
      state.fileId = action.payload;
    },

    setCreatedFileCodeRedux: (state, action: PayloadAction<string>) => {
      const fileId = state.fileId;
      if (!fileId) return;

      ensureFile(state, fileId);
      state.content[fileId].code = action.payload;
    },

    setCreatedFileOutputRedux: (state, action: PayloadAction<string>) => {
      const fileId = state.fileId;
      if (!fileId) return;
      ensureFile(state, fileId);
      state.content[fileId].output = action.payload;
    },

    setCreatedFileEditorId: (state, action: PayloadAction<string>) => {
      const fileId = state.fileId;
      if (!fileId) return;
      state.content[fileId].editorId = action.payload;
    },

    setCreatedFileLangRedux: (state, action: PayloadAction<string>) => {
      const fileId = state.fileId;
      if (!fileId) return;
      ensureFile(state, fileId);
      state.content[fileId].lang = action.payload;
    },

    setCreatedFileNameRedux: (state, action: PayloadAction<string>) => {
      const fileId = state.fileId;
      if (!fileId) return;
      ensureFile(state, fileId);
      state.content[fileId].fileName = action.payload;
    },
  },
});

export const {
  setCreatedFileCodeRedux,
  setCreatedFileEditorId,
  setCreatedFileIdRedux,
  setCreatedFileLangRedux,
  setCreatedFileOutputRedux,
  setCreatedFileNameRedux,
} = createdFileEditorSlice.actions;

export const selectedfileId = (state: RootState) =>
  state.createdFileEditorCode.fileId;

export const selectedCreatedFileCode = (state: RootState) => {
  const fileId = state.createdFileEditorCode.fileId;
  return state.createdFileEditorCode.content[fileId]?.code || "";
};

export const selectedCreatedFileOutput = (state: RootState) => {
  const fileId = state.createdFileEditorCode.fileId;
  return state.createdFileEditorCode.content[fileId]?.output || "";
};

export const selectedCreatedFileEditorId = (state: RootState) => {
  const fileId = state.createdFileEditorCode.fileId;
  return state.createdFileEditorCode.content[fileId]?.editorId || "";
};

export const selectedCreatedFileLang = (state: RootState) => {
  const fileId = state.createdFileEditorCode.fileId;
  return state.createdFileEditorCode.content[fileId]?.lang || "";
};

export const selectedCreatedFileName = (state: RootState) => {
  const fileId = state.createdFileEditorCode.fileId;
  return state.createdFileEditorCode.content[fileId]?.fileName || "";
};

export default createdFileEditorSlice.reducer;
