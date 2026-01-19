import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IFolderId {
  folderId: string | null;
  treeRefreshKey: number;
  lastRefreshedNode: string | null;
}

const initialState: IFolderId = {
  folderId: null,
  treeRefreshKey: 0,
  lastRefreshedNode: null,
};

export const fileFolderSlice = createSlice({
  name: "folderId",
  initialState,
  reducers: {
    setFolderId: (state, action: PayloadAction<string | null>) => {
      state.folderId = action.payload;
    },
    refreshTree: (state, action: PayloadAction<string | null>) => {
      state.treeRefreshKey += 1;
      state.lastRefreshedNode = action.payload;
    },
  },
});

export const { setFolderId, refreshTree } = fileFolderSlice.actions;

export const selectFolderId = (state: RootState) => state.folderId.folderId;
export const selectTreeRefreshKey = (state: RootState) =>
  state.folderId.treeRefreshKey;
export const selectLastRefreshedNode = (state: RootState) => state.folderId.lastRefreshedNode;

export default fileFolderSlice.reducer;
