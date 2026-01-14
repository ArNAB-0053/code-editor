import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IEditorLayout {
  layout: "vertical" | "horizontal";
}

const initialState: IEditorLayout = {
  layout: "vertical",
};

export const editorLayoutSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setEditorLayout: (
      state,
      action: PayloadAction<"vertical" | "horizontal">
    ) => {
      state.layout = action.payload;
    },
  },
});

export const { setEditorLayout } = editorLayoutSlice.actions;

export const selectEditorLayout = (state: RootState) =>
  state.editorLayout.layout;

export default editorLayoutSlice.reducer;
