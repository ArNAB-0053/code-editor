import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface activeField {
    fieldSlug: string,
    parenntKey: string,
}

const initialState: activeField = {
    fieldSlug: "",
    parenntKey: ""
}

export const activeFieldSlice = createSlice({
    name: "activeField",
    initialState,
    reducers: {
        setActiveField: (state, action: PayloadAction<string>) => {
            state.fieldSlug = action.payload
        },
        setParentKey: (state, action: PayloadAction<string>) => {
            state.parenntKey = action.payload
        }
    }
})

export const { setActiveField, setParentKey } = activeFieldSlice.actions

export const selectActiveField = (state: RootState) => state.activeField.fieldSlug
export const selectParenntKey = (state: RootState) => state.activeField.parenntKey

export default activeFieldSlice.reducer