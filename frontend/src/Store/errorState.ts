import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ERRORS } from "../Types/errorStateTypes";

const initialState : ERRORS = {
    errors : [],
}

const errorsSlice = createSlice({
    name: 'errorsState',
    initialState,
    reducers: {
        addError : (state : ERRORS, action: PayloadAction<string>) => {
            state.errors.push(action.payload);
        },
        clearErrors : (state : ERRORS) => {
            state.errors = []
        }
    }
})

export const { addError, clearErrors } = errorsSlice.actions;
export default errorsSlice.reducer;