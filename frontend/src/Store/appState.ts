import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type APP_STATE, type APP_STATE_CURR } from "../Utils/appStateUtils";

const initialState : APP_STATE_CURR = {
    appState: 'MAIN'
}

const appSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setAppState : (state : APP_STATE_CURR , action: PayloadAction<APP_STATE>) => {
            state.appState = action.payload
        }
    }
})

export const { setAppState } = appSlice.actions
export default appSlice.reducer