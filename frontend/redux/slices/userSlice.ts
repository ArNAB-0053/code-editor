import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NameObjType } from "@/@types/_base";
import { ProviderTypeEnumString } from "@/@types/_enums";
import { fallbackAvatar } from "@/constants/base.const";

export const EXPIRE_TIME = 48 * 60 * 60 * 1000;

export interface IUserState {
  id: string;
  name: NameObjType;
  email: string;
  username: string;
  provider: ProviderTypeEnumString
  _persistedAt?: number | null;
}

export const initialState: IUserState = {
  id: "",
  name: fallbackAvatar,
  email: "",
  username: "",
  provider: ProviderTypeEnumString.NORMAL,
  _persistedAt: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setUserName: (state, action: PayloadAction<NameObjType>) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setUserProvider: (state, action: PayloadAction<ProviderTypeEnumString>) => {
      state.provider = action.payload;
    },
    setPersistedAt: (state, action: PayloadAction<number>) => {
      state._persistedAt = action.payload;
    },
    setUserEmpty: () => initialState,
  },
});

export const {
  setUserId,
  setUserName,
  setUserEmail,
  setUserUsername,
  setUserProvider,
  setPersistedAt,
  setUserEmpty
} = userSlice.actions;

export const selectedUserId = (state: RootState) => state.user.id;
export const selectedUserName = (state: RootState) => state.user.name;
export const selectedUserEmail = (state: RootState) => state.user.email;
export const selectedUserUsername = (state: RootState) => state.user.username;
export const selectedUserProvider = (state: RootState) => state.user.provider;

export default userSlice.reducer;
