import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ERRORS_STATE_NAME, type ERRORS } from "../Utils/errorStateUtils";

const initialState : ERRORS = {
    errors : [],
}

const errorsSlice = createSlice({
    name: ERRORS_STATE_NAME,
    initialState,
    reducers: {
        addError : (state : ERRORS, action: PayloadAction<string>) => {

            if(!state.errors.includes(action.payload)){
                state.errors.push(action.payload);
            }
        },
        clearAllErrors : (state : ERRORS) => {
            state.errors.length = 0;
        },
        clearError: (state: ERRORS, action: PayloadAction<string>) => {
            state.errors = state.errors.filter(error => error !== action.payload);
        }
    }
})

export const { addError, clearAllErrors, clearError } = errorsSlice.actions;
export default errorsSlice.reducer;