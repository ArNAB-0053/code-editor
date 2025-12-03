import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface IEditorState {
    code: string,
    lang: string,
    output: string,
    editorId: string,
}

const initialState: IEditorState = {
    code : "",
    lang : "",
    output : "",
    editorId : "",
}

export const editorCodeSlice = createSlice({
    name: "editorCode",
    initialState,
    reducers: {
        setCodeRedux: (state, action: PayloadAction<string>) => {
            state.code = action.payload
        },
        setLangRedux: (state, action: PayloadAction<string>) => {
            state.lang = action.payload
        },
        setOutputRedux: (state, action: PayloadAction<string>) => {
            state.output = action.payload
        },
        setEditorId: (state, action: PayloadAction<string>) => {
            state.editorId = action.payload
        },
    }
})

export const {setCodeRedux, setLangRedux, setOutputRedux, setEditorId} = editorCodeSlice.actions

export const selectedCode = (state: RootState) => state.editorCode.code
export const selectedLang = (state: RootState) => state.editorCode.lang
export const selectedOutput = (state: RootState) => state.editorCode.output
export const selectedEditorId = (state: RootState) => state.editorCode.editorId

export default editorCodeSlice.reducer