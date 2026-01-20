import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IContent {
  title: string;
  content: string;
}

export interface INoteState {
  note: Record<string, IContent>;
  fileId: string;
}

const initialState: INoteState = {
  note: {},
  fileId: "",
};

const ensureFile = (state: INoteState, fileId: string) => {
  if (!state.note[fileId]) {
    state.note[fileId] = {
      title: "",
      content: "",
    };
  }
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotesTitle: (
      state,
      action: PayloadAction<{ fileId: string; title: string }>,
    ) => {
      ensureFile(state, action.payload.fileId);
      state.note[action.payload.fileId].title = action.payload.title;
    },

    setNotesContent: (state, action: PayloadAction<{fileId: string; content: string}>) => {
      ensureFile(state, action.payload.fileId);
      state.note[action.payload.fileId].content = action.payload.content;
    },
  },
});

export const { setNotesTitle, setNotesContent } =
  notesSlice.actions;

export const selectedNote = (state: RootState) => state.notes.note

export default notesSlice.reducer;
