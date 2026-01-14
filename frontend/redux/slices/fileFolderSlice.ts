import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface IFolderId {
    folderId: string | null,
}

const initialState: IFolderId = {
    folderId: null
}

export const fileFolderSlice = createSlice({
    name: "folderId",
    initialState,
    reducers: {
        setFolderId: (state, action: PayloadAction<string|null>) => {
            state.folderId = action.payload
        },
    }
})

export const { setFolderId } = fileFolderSlice.actions

export const selectFolderId = (state: RootState) => state.folderId.folderId

export default fileFolderSlice.reducer