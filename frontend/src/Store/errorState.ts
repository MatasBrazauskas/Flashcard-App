import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ERRORS } from "../Utils/errorStateUtils";

const initialState : ERRORS = {
    errors : [],
}

const errorsSlice = createSlice({
    name: 'errorsState',
    initialState,
    reducers: {
        addError : (state : ERRORS, action: PayloadAction<string>) => {
            state.errors.push(action.payload);
            console.log(state.errors);
        },
        clearErrors : (state : ERRORS) => {
            state.errors.length = 0;
        }
    }
})

export const { addError, clearErrors } = errorsSlice.actions;
export default errorsSlice.reducer;