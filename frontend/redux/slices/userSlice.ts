import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IUserState {
    id: string;
    name: string;
    email: string;
    password?: string
}

const initialState: IUserState = {
    id: "",
    name: "Guest",
    email: "",
    password: ""
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId: (state, action:PayloadAction<string>) => {
            state.id = action.payload
        },
        setUserName: (state, action:PayloadAction<string>) => {
            state.name = action.payload
        },
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setUserPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    }
})

export const {setUserId, setUserName, setUserEmail, setUserPassword} = userSlice.actions;

export const selectedUserId = (state: RootState) => state.user.id
export const selectedUserName = (state: RootState) => state.user.name
export const selectedUserEmail = (state: RootState) => state.user.email
export const selectedUserPassword = (state: RootState) => state.user.password

export default userSlice.reducer