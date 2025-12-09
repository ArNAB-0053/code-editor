import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { NameObjType } from "@/@types/_base";

export interface IUserState {
  id: string;
  name: NameObjType;
  email: string;
  username: string;
}

const initialState: IUserState = {
  id: "",
  name: {
    firstname: "Guest",
    middlename: "",
    lastname: "",
  },
  email: "",
  username: "",
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
  },
});

export const { setUserId, setUserName, setUserEmail, setUserUsername } =
  userSlice.actions;

export const selectedUserId = (state: RootState) => state.user.id;
export const selectedUserName = (state: RootState) => state.user.name;
export const selectedUserEmail = (state: RootState) => state.user.email;
export const selectedUserUsername = (state: RootState) => state.user.username;

export default userSlice.reducer;
