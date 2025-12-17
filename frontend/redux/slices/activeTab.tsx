import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IActiveTab {
  activeTabKey: string;
  activeTabLabel: string;
}

const initialState: IActiveTab = {
  activeTabKey: "1",
  activeTabLabel: "card",
};

export const activeTabSlice = createSlice({
  name: "activeTab",
  initialState,
  reducers: {
    setActiveTabKey: (state, action: PayloadAction<string>) => {
      state.activeTabKey = action.payload;
    },
    setActiveTabLabel: (state, action: PayloadAction<string>) => {
      state.activeTabLabel = action.payload;
    },
  },
});

export const { setActiveTabKey, setActiveTabLabel } = activeTabSlice.actions;

export const selectedActiveTabKey = (state: RootState) =>
  state.activeTab.activeTabKey;
export const selectedActiveTabLabel = (state: RootState) =>
  state.activeTab.activeTabLabel;

export default activeTabSlice.reducer;
